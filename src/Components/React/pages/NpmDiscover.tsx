import React, {useEffect, useState, useCallback} from 'react';

import {
    Flex,
    List,
    ListItem,
    ListIcon,
    Button,
    Box,
    Text,
    Badge,
    Divider,
    Progress,
    Collapse,
    Code
} from '@chakra-ui/react';

import {
    AttachmentIcon
} from '@chakra-ui/icons';

import { useDropzone } from 'react-dropzone';

import '../../Sass/pages/NpmDiscover.sass';

import { Socket } from 'phoenix';

import axios from 'axios';

import npmStatus from '../data/npmStatus';

import NpmResult from '../component/NpmResult';

import _ from 'lodash';

import { useHistory, useParams } from "react-router-dom";

interface RouteParams {
    apiKey: string
}

export default function NpmDiscover(props: any) {
    
    const [apiKey, setApiKey] = useState('');
    const [process, setProcess] = useState<npmStatus[]>([]);
    const [received, setReceived] = useState<npmStatus>();

    let params = useParams<RouteParams>();

    const {
        getRootProps,
        getInputProps,
        acceptedFiles
    } = useDropzone({accept: 'application/json'});
    
    useEffect(() => {
        setApiKey(params.apiKey);

        if (params.apiKey) {
            let socket: Socket = new Socket("ws://localhost:4000/socket");
            socket.connect();

            let channel = socket.channel(`npm:${params.apiKey}`, {});
            channel.join()
                .receive("ok", resp => {
                    console.log("success on receive", resp);
                })
                .receive("error", resp => {
                    console.log("Unable to join", resp);
                });

            channel.on("result", payload => {
                console.log("Got message", payload);
                // payload.result = JSON.parse(payload.result);
                setReceived(payload);
                // SetProcessFromSocket(payload);
            })
        }

        // setProcess([
        //     {
        //         application: null,
        //         id: null,
        //         result: "Invalid JSON",
        //         status: "failed"
        //     },
        //     {
        //         application: "venda-carros-automaticos",
        //         id: "aff928c8-3054-44a4-abfd-bb86cd287d06",
        //         result: null,
        //         status: "scheduled"
        //     },
        //     {
        //         application: "half-pugg",
        //         id: "1e3270ec-e3a1-476b-bf24-2efb20a0aaba",
        //         result: null,
        //         status: "scheduled"
        //     },
        //     {
        //         application: "selah-joalheria",
        //         id: "0fb5d69d-8dd5-4e4b-abbd-7a13d429b2a0",
        //         result: {
        //           packages: [
        //             "react-scripts",
        //             "ansi-html",
        //             "jest-jasmine2",
        //             "nanomatch",
        //             "jest-snapshot",
        //             "braces",
        //             "browserslist",
        //             "@jest/reporters",
        //             "cliui",
        //             "readdirp",
        //             "jest-cli",
        //             "immer",
        //             "webpack",
        //             "jest-haste-map",
        //             "cssnano",
        //             "wrap-ansi",
        //             "@jest/transform",
        //             "@svgr/webpack",
        //             "@jest/core",
        //             "strip-ansi",
        //             "glob-parent",
        //             "optimize-css-assets-webpack-plugin",
        //             "ansi-regex",
        //             "postcss-svgo",
        //             "cssnano-preset-default",
        //             "watchpack",
        //             "css-select",
        //             "cache-base",
        //             "jest-resolve-dependencies",
        //             "jest",
        //             "set-value",
        //             "yargs",
        //             "micromatch",
        //             "sane",
        //             "@svgr/plugin-svgo",
        //             "union-value",
        //             "webpack-dev-server",
        //             "watchpack-chokidar2",
        //             "base",
        //             "jest-circus",
        //             "chokidar",
        //             "fork-ts-checker-webpack-plugin",
        //             "@pmmmwh/react-refresh-webpack-plugin",
        //             "babel-jest",
        //             "@jest/test-sequencer",
        //             "svgo",
        //             "nth-check",
        //             "jest-runner",
        //             "jest-config",
        //             "react-dev-utils",
        //             "jest-runtime",
        //             "expand-brackets",
        //             "anymatch",
        //             "string-width",
        //             "extglob",
        //             "snapdragon",
        //             "http-proxy-middleware"
        //           ],
        //           vulnerabilities: {
        //             "critical": 2,
        //             "high": 39,
        //             "info": 0,
        //             "low": 0,
        //             "moderate": 16,
        //             "total": 57
        //           }
        //         },
        //         status: "vulnerable"
        //     }
        // ])
    }, []);

    useEffect(() => {
        if (!received) return;

        var obj: npmStatus = received;
                
        obj.result = JSON.parse(obj.result);

        console.log(process);
        const tmp = [...process];

        // Find item index using _.findIndex (thanks @AJ Richardson for comment)
        var index = _.findIndex(tmp, {id: obj.id});

        if (index == -1) {
            tmp.push(obj);
        } else {
            tmp[index] = obj;
        }

        setProcess(tmp);

        console.log(process);
        console.log(tmp);
    }, [received])

    const files = acceptedFiles.map(file => (
        <ListItem key={file.name}>
            <ListIcon as={AttachmentIcon} color="green.500" />
            {file.name}
        </ListItem>
    ));

    async function SubmitToCaronte() {
        const url = 'http://localhost:4000/npm';
        const formData = new FormData();

        acceptedFiles.map(file => {
            formData.append('packages[]', file);
        })

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'X-Api-Key': apiKey
            }
        }

        axios.post(url, formData, config).then(resp => {
            console.log(resp.data);
            var data: npmStatus[] = resp.data as npmStatus[];
            setProcess(data);
        });
    }
    
    return (
        <Flex align='center' justify='center' direction='column'>
            <Flex className="container" flexDirection={'column'} style={{marginTop: '3em', maxWidth: '80vh'}} >
            {
                process.length == 0 ? 
                    <>
                        <div {...getRootProps({className: 'dropzone-container'})}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <h4>Files</h4>
                            <List>
                                {files}
                            </List>
                            <Button
                                mt={4}
                                // isLoading={props.isSubmitting}
                                type="submit"
                                disabled={files.length == 0}
                                onClick={SubmitToCaronte}
                            >
                                send packages to analyse
                            </Button>
                        </aside>
                    </>
                    :
                    <>
                        {process.map(p => {
                            if (!p.id) {
                                return <>
                                    <Flex style={{marginBottom: '1.5em', marginTop: '1.5em'}}>
                                        <Box ml="3">
                                            <Text fontSize='2em' fontWeight="bold">
                                            {p.result}
                                                <Badge ml="1" colorScheme="red">
                                                    {p.status}
                                                </Badge>
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Divider></Divider>
                                </>
                            } else {
                                if (p.result == null) {
                                    return <>
                                    <Flex style={{marginBottom: '1.5em', marginTop: '1.5em'}}>
                                        <Box ml="3">
                                            <Text fontSize='2em' fontWeight="bold">
                                            Processando
                                                <Badge ml="1" colorScheme="yellow">
                                                    {p.status}
                                                </Badge>
                                            </Text>
                                            <Text style={{marginBottom: '1em'}}>Aplicação: <b>{p.application}</b></Text>
                                            <Progress size="xs" isIndeterminate />
                                        </Box>
                                    </Flex>
                                    <Divider></Divider>
                                </>
                                } else {
                                    return <NpmResult p={p}></NpmResult>
                                }
                            }
                        })}
                    </>
            }
            </Flex>
        </Flex>
    )
}