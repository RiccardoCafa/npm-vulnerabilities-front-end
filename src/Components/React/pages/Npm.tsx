import React, {useState} from 'react';
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
import '../../Sass/pages/Npm.sass';

export default function Npm() {
    const { colorMode } = useColorMode();

    const [apiKey, setApiKey] = useState('');

    const buttonBackground = useColorModeValue("gray.100", "gray.700");

    const history = useHistory();

    function goTo(path: string) {
        history.push(path);
    }

    function goToWithKey(target: React.MouseEvent<HTMLButtonElement, MouseEvent>, path: string) {
        target.preventDefault();
        history.push(`${path}/${apiKey}`);
        // `${path}?apiKey=${apiKey}`
    }

    function setApiKeyOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        var key: string = event.target.value;

        setApiKey(key);
    }

    return(
        // alignContent: 'center', justifyContent: 'center',
        <Flex height={'100%'} style={{padding: '5em'}} align='center' justifyContent='center' direction={'column'}>
            <Flex align='center' justifyContent='center' direction={'column'} className='fade-container'>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                first time here or want a new npm vulnerability research? <br/> Click below to start!
                </Text>
                <Button onClick={() => goTo("npmdiscover")} backgroundColor={buttonBackground} rightIcon={<ArrowForwardIcon />} mt={4} isLoading={false} type="button"> 
                npm vulnerability discover
                </Button>
            </Flex>
            <Divider style={{marginTop: '2em'}} orientation="horizontal" />
            <FormControl id="first-name" style={{maxWidth: '50em'}} className='fade-container'>
                <FormLabel style={{fontWeight: 'lighter', fontSize: '.8em', marginTop: '2em'}}>Already has a vulnerability discover on going? Use your key to see the results</FormLabel>
                <FormLabel style={{fontWeight: 'bold'}}>Key</FormLabel>
                <Flex direction={'row'}>
                    <Input placeholder="000a0000-a00a-00a0-a000-000000000000" onChange={(e) => setApiKeyOnChange(e)} style={{marginRight: '1em'}} />
                    <Tooltip label="Search this key">
                        <IconButton aria-label="Search database" icon={<SearchIcon />} type='submit' onClick={(e) => goToWithKey(e, 'npmdiscover')} />
                    </Tooltip>
                </Flex>
            </FormControl>
        </Flex>
    ) 
}