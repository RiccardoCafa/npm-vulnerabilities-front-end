import { Flex, Text, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

interface RouteParams {
    apiKey: string;
}

export default function CyberChoose() {

    const params = useParams<RouteParams>();
    const history = useHistory();

    const [apiKey, setApiKey] = useState('');

    useEffect(() => {
        setApiKey(params.apiKey);

        if (!params.apiKey) {
            history.push('/keyselection/cyber');
        }
    }, []);

    function goToFramework() {
        history.push(`/cyber/${apiKey}`);
    }

    function goToHistory() {
        history.push(`/cyber/result/${apiKey}`);
    }

    return (
        <Flex marginTop='10em' flexDirection="column" width="100%" justifyItems="center" alignItems="center" height="100%">
            <Text fontSize='0.8em' marginBottom='0.4em'>key: {apiKey}</Text>
            <Text marginBottom="1em">
                Welcome back! What do you want to do?
            </Text>
            <Button onClick={() => goToFramework()} marginBottom="1em">
                Start a new framework form
            </Button>
            <Button onClick={() => goToHistory()} marginBottom="1em">
                See my history
            </Button>
        </Flex>
    )
}