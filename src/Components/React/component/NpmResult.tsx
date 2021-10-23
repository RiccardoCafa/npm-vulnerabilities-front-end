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
    useBoolean,
    Stat, StatLabel, StatNumber, StatHelpText, StatArrow
} from '@chakra-ui/react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {npmStatus} from '../data/npmStatus';
import StatusBadge from './StatusBadge';

export function VulnerabilityStats({result}: {result: any}) {
    
    const [show, setShow] = useBoolean();

    const vulns = ["Critical", "High", "Info", "Low", "Moderate", "Total"];

    return (
        <>
        {result.vulnerabilities.total != 0 ?
            <>
                <StatGroup style={{marginBottom: '2em'}}>
                    {vulns.map((vulnKey, _) => (
                        <Stat>
                            <StatLabel>{vulnKey}</StatLabel>
                            <StatNumber style={{marginTop: '0.5em'}}>{result.vulnerabilities[vulnKey.toLowerCase()]}</StatNumber>
                            {console.log(result.vulnerabilities)}
                            {/* <StatHelpText>
                                <StatArrow type="increase" />
                                X%
                            </StatHelpText> */}
                        </Stat>
                    ))}
                </StatGroup>
                <Collapse startingHeight={100} in={show}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                    {JSON.stringify(result.packages, undefined, 4)}
                    </SyntaxHighlighter>
                </Collapse>
                <Button size="sm" onClick={setShow.toggle} mt="1rem">
                    Show {show ? "Less" : "More"}
                </Button>
            </>
            : <></>
        }
    </>)
}

export default function NpmResult({p, showStatus}: {p: npmStatus, showStatus?: boolean}) {
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
                    {showStatus ?
                        <StatusBadge status={p.status}></StatusBadge> 
                        : ""
                    }
                </Text>
                <Text style={{marginBottom: '1.5em'}}>Aplicação: <b>{p.application}</b></Text>
                <VulnerabilityStats result={p.result}></VulnerabilityStats>
            </Box>
        </Flex>
        <Divider></Divider>
        </>
    );
}