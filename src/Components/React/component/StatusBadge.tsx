import React from 'react';

import {
    Badge
} from '@chakra-ui/react';

interface VulnDict {
    [id: string] : string;
}

export default function StatusBadge({status}: {status: string}) {

    const vulnColors: VulnDict = {
        vulnerable: 'red',
        ok: 'green',
        scheduled: 'yellow',
        failed: 'red'
    };
    
    return (
        <Badge ml="1" colorScheme={vulnColors[status]}>
            {status}
        </Badge>
    )
}