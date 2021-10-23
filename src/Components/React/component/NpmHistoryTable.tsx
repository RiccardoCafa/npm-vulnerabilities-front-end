import React from 'react';

import {
    Table,
    TableCaption,
    Thead,
    Tr, Th, Td, Tbody,
    Tfoot,
    Button
} from '@chakra-ui/react';

import {npmHistory} from '../data/npmStatus';
import StatusBadge from './StatusBadge';
import NpmHistoryRow from './NpmHistoryRow';

export default function NpmHistoryTable({histories}: {histories: npmHistory[]}) {

    return (
        <Table variant='striped' colorScheme={'blackAlpha'} size={'sm'} style={{marginTop: '2em'}}>
            <TableCaption>
                history of npm vulnerability process taken before with that key
            </TableCaption>
            <Thead>
                <Tr>
                    <Th>Id</Th>
                    <Th>Application</Th>
                    <Th>Total Vulnerability</Th>
                    <Th>Status</Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {histories.map((historia) => (
                    <NpmHistoryRow historia={historia}></NpmHistoryRow>
                    // <Tr>
                    //     <Td>{historia.id}</Td>
                    //     <Td>{historia.application}</Td>
                    //     <Td>{historia.totalVulnerability}</Td>
                    //     <Td><StatusBadge status={historia.status}></StatusBadge></Td>
                    //     {historia.totalVulnerability > 0 ? <Td><Button colorScheme={'purple'}>Show</Button></Td> : <Td></Td>}
                    // </Tr>
                ))}
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th>Id</Th>
                    <Th>Application</Th>
                    <Th>Total Vulnerability</Th>
                    <Th>Status</Th>
                    <Th></Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}