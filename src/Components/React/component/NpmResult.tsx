import React, {useState} from 'react';

import {
    Flex,
    Button,
    Box,
    Text,
    Badge,
    Divider,
    Collapse
} from '@chakra-ui/react';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import npmStatus from '../data/npmStatus';

export default function NpmResult({p}: {p: npmStatus}) {

    const [show, setShow] = useState(false);

    return (
        <>
        <Flex style={{marginBottom: '1.5em', marginTop: '1.5em'}}>
            <Box ml="3">
                <Text fontSize='2em' fontWeight="bold">
                <b>{p.id}</b>
                    <Badge ml="1" colorScheme={p.result.vulnerabilities.total == 0 ? "green" : "red"}>
                        {p.status}
                    </Badge>
                </Text>
                <Text style={{marginBottom: '1.5em'}}>Aplicação: <b>{p.application}</b></Text>
                <Collapse startingHeight={100} in={show}>
                    <SyntaxHighlighter language="javascript" style={docco}>
                    {JSON.stringify(p.result.packages, undefined, 4)}
                    </SyntaxHighlighter>
                </Collapse>
                <Button size="sm" onClick={() => setShow(!show)} mt="1rem">
                    Show {show ? "Less" : "More"}
                </Button>
            </Box>
        </Flex>
        <Divider></Divider>
        </>
    );
}