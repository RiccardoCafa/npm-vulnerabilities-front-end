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
    Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Progress
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
                            <StatNumber style={{marginTop: '0.5em'}}>{result.vulnerabilities[vulnKey.toLowerCase()] ?? 0}</StatNumber>
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

export default function NpmResult({p}: {p: npmStatus}) {
    return (
        <>
        <Flex style={{marginBottom: '1.5em', marginTop: '1.5em'}}>
            <Box ml="3">
                <Text fontSize='2em' fontWeight="bold">
                    {!p.id ? 
                        <>
                            {p.result}
                            <StatusBadge status={p.status}></StatusBadge>
                        </>
                    :
                        <>
                            {p.application}
                            <StatusBadge status={p.status}></StatusBadge>
                        </>
                    }
                </Text>
                {p.id ?
                    <Text style={{marginBottom: '1em'}}>Id: <b>{p.id}</b></Text>
                : <></>}
                {!p.id && p.result == null ?
                    <Progress size="xs" isIndeterminate />
                : <></> }
                {p.id && p.result ? 
                    <VulnerabilityStats result={p.result}></VulnerabilityStats>
                : <></>}
            </Box>
        </Flex>
        <Divider></Divider>
        </>
    );
}