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
    Heading
} from '@chakra-ui/react';

import {
    AttachmentIcon
} from '@chakra-ui/icons';

import { useDropzone } from 'react-dropzone';

import '../../Sass/pages/Npm.sass';

import { Socket } from 'phoenix';

import axios from 'axios';

import {npmStatus, npmHistory} from '../data/npmStatus';

import NpmResult from '../component/NpmResult';
import NpmHistoryTable from '../component/NpmHistoryTable';

import { useHistory, useParams } from "react-router-dom";

import _ from 'lodash';

// mock data
import processHistoryMock from '../../../mock/process-history.json';
import processMock from '../../../mock/process.json';
import StatusBadge from '../component/StatusBadge';

interface RouteParams {
    apiKey: string
}

export default function Npm(props: any) {
    
    const [apiKey, setApiKey] = useState('');
    const [process, setProcess] = useState<npmStatus[]>([]);
    const [processHistory, setProcessHistory] = useState<npmHistory[]>();
    const [received, setReceived] = useState<npmStatus>();

    const history = useHistory();
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
        } else {
            // TODO check cache if there is one stored, otherwise push to keyselection 
            history.push('keyselection/npm');
        }

        // get history from API
        setProcessHistory(processHistoryMock)

        // setProcess(processMock);
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
                    {
                        processHistory && processHistory.length > 0 ?
                        <>
                            <Heading size={'md'} style={{textTransform: 'uppercase'}}>npm vulnerabilities history</Heading>
                            <NpmHistoryTable histories={processHistory}></NpmHistoryTable>
                            <Divider style={{marginTop: '1em', marginBottom: '2em'}}></Divider>
                        </>
                        : ""
                    }
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
                                                <StatusBadge status={p.status}></StatusBadge>
                                                {/* <Badge ml="1" colorScheme="red">
                                                    {p.status}
                                                </Badge> */}
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
                                                <StatusBadge status={p.status}></StatusBadge>
                                                {/* <Badge ml="1" colorScheme="yellow">
                                                    {p.status}
                                                </Badge> */}
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