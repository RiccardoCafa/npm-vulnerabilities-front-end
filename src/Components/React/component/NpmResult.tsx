import React, {useState} from 'react';

import {
    Flex,
    Button,
    Box,
    Text,
    Badge,
    Divider,
    Collapse,
    StatGroup,
    Stat, StatLabel, StatNumber, StatHelpText, StatArrow
} from '@chakra-ui/react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {npmStatus} from '../data/npmStatus';
import StatusBadge from './StatusBadge';

export default function NpmResult({p}: {p: npmStatus}) {

    const [show, setShow] = useState(false);

    const vulns = p.result.vulnerabilities;
/*
critical: 0,
high: 0,
info: 0,
low: 0,
moderate: 0,
total: 0
*/
    return (
        <>
        <Flex style={{marginBottom: '1.5em', marginTop: '1.5em'}}>
            <Box ml="3">
                <Text fontSize='2em' fontWeight="bold">
                <b>{p.id}</b>
                    <StatusBadge status={p.status}></StatusBadge>
                    {/* <Badge ml="1" colorScheme={p.result.vulnerabilities.total == 0 ? "green" : "red"}>
                        {p.status}
                    </Badge> */}
                </Text>
                <Text style={{marginBottom: '1.5em'}}>Aplicação: <b>{p.application}</b></Text>
                {p.result.vulnerabilities.total != 0 ?
                    <>
                        <StatGroup style={{marginBottom: '2em'}}>
                            <Stat>
                                <StatLabel>Critical</StatLabel>
                                <StatNumber>{vulns.critical}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="increase" />
                                X%
                                </StatHelpText>
                            </Stat>
                            <Stat>
                                <StatLabel>High</StatLabel>
                                <StatNumber>{vulns.high}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="increase" />
                                X%
                                </StatHelpText>
                            </Stat>
                            <Stat>
                                <StatLabel>Info</StatLabel>
                                <StatNumber>{vulns.info}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="increase" />
                                X%
                                </StatHelpText>
                            </Stat>
                            <Stat>
                                <StatLabel>Low</StatLabel>
                                <StatNumber>{vulns.low}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="increase" />
                                X%
                                </StatHelpText>
                            </Stat>
                            <Stat>
                                <StatLabel>Moderate</StatLabel>
                                <StatNumber>{vulns.moderate}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="increase" />
                                X%
                                </StatHelpText>
                            </Stat>
                            <Stat>
                                <StatLabel>Total</StatLabel>
                                <StatNumber>{vulns.total}</StatNumber>
                                <StatHelpText>
                                <StatArrow type="increase" />
                                X%
                                </StatHelpText>
                            </Stat>
                        </StatGroup>
                        <Collapse startingHeight={100} in={show}>
                            <SyntaxHighlighter language="javascript" style={docco}>
                            {JSON.stringify(p.result.packages, undefined, 4)}
                            </SyntaxHighlighter>
                        </Collapse>
                        <Button size="sm" onClick={() => setShow(!show)} mt="1rem">
                            Show {show ? "Less" : "More"}
                        </Button>
                    </>
                : <></>
                }
            </Box>
        </Flex>
        <Divider></Divider>
        </>
    );
}