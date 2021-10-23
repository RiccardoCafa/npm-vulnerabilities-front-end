import React, {useState} from 'react';

import {
    Td, Tr, Button, Text, useBoolean
} from '@chakra-ui/react';

import {npmHistory} from '../data/npmStatus';
import StatusBadge from './StatusBadge';
import {VulnerabilityStats} from './NpmResult';


export default function NpmHistoryRow({historia}: {historia: npmHistory}) {

    const [show, setShow] = useBoolean();

    return (
        <>
            <Tr>
                <Td>{historia.id}</Td>
                <Td>{historia.application}</Td>
                <Td>{historia.totalVulnerability}</Td>
                <Td><StatusBadge status={historia.status}></StatusBadge></Td>
                {historia.totalVulnerability > 0 ? 
                    <Td>
                        <Button colorScheme={'purple'} onClick={setShow.toggle}>{!show ? "Show" : "Hide"}</Button>
                    </Td> 
                    : <Td></Td>
                }
            </Tr>
            {show ?
            <Tr>
                <Td colSpan={5}>
                    <VulnerabilityStats result={historia.result}></VulnerabilityStats>
                </Td>
            </Tr>
            : ""}
        </>
    )

}