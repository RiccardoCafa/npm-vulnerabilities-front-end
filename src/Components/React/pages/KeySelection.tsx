import React, {useState, useEffect} from 'react';

import { useParams } from "react-router-dom";

import {
    FormControl,
    FormLabel,
    Input,
    Text,
    Button,
    Flex,
    IconButton,
    Divider,
    Tooltip,
    useColorMode,
    useColorModeValue
} from "@chakra-ui/react"

import { SearchIcon, ArrowForwardIcon } from '@chakra-ui/icons';

import { useHistory } from "react-router-dom";
import '../../Sass/pages/KeySelection.sass';
import axios from 'axios';

interface RouteParams {
    flow: string;
}

interface Key {
    key: string;
}

export default function KeySelection() {
    const { colorMode } = useColorMode();
    
    let params = useParams<RouteParams>();

    const [storedKey, setStoredKey] = useState<Key>();

    const [apiKey, setApiKey] = useState('');
    const [flow, setFlow] = useState('');

    const buttonBackground = useColorModeValue("gray.100", "gray.700");

    const history = useHistory();

    useEffect(() => {
        setFlow(params.flow);
        
        if (storedKey != undefined)
            setStoredKey(storedKey);
    }, []);

    function goToWithNewKey(target: React.MouseEvent<HTMLButtonElement, MouseEvent>, path: string) {
        target.preventDefault();
        
        getNewKey().then(key => {
            history.push(`/${path}/${key.key}`);
        })
    }
    
    function goToWithKey(target: React.MouseEvent<HTMLButtonElement, MouseEvent>, path: string) {
        target.preventDefault();

        history.push(`/${path}/${apiKey}`);
    }

    function setApiKeyOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        var key: string = event.target.value;

        setApiKey(key);
    }

    async function getNewKey(): Promise<Key> {
        var newKey: Key = { key: "" };

        var resp = await axios.post("http://localhost:1323/users", {
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            }
        });
        newKey = resp.data as Key;

        return newKey;
    }

    return(
        // alignContent: 'center', justifyContent: 'center',
        <Flex height={'100%'} style={{padding: '5em'}} align='center' justifyContent='center' direction={'column'}>
            <Flex align='center' justifyContent='center' direction={'column'} className='fade-container'>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                first time here or want a new key? <br/> Click below to start!
                </Text>
                <Button onClick={(e) => goToWithNewKey(e, flow)} backgroundColor={buttonBackground} rightIcon={<ArrowForwardIcon />} mt={4} isLoading={false} type="button"> 
                new key for npm vulnerability discover
                </Button>
            </Flex>
            <Divider style={{marginTop: '2em'}} orientation="horizontal" />
            <FormControl id="first-name" style={{maxWidth: '50em'}} className='fade-container'>
                <FormLabel style={{fontWeight: 'lighter', fontSize: '.8em', marginTop: '2em'}}>Already has a key? Use your key to see the results</FormLabel>
                <FormLabel style={{fontWeight: 'bold'}}>Key</FormLabel>
                <Flex direction={'row'}>
                    <Input placeholder="000a0000-a00a-00a0-a000-000000000000" onChange={(e) => setApiKeyOnChange(e)} style={{marginRight: '1em'}} />
                    <Tooltip label="Search this key">
                        <IconButton aria-label="Search database" icon={<SearchIcon />} type='submit' onClick={(e) => goToWithKey(e, flow)} />
                    </Tooltip>
                </Flex>
            </FormControl>
        </Flex>
    ) 
}