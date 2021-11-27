import React from 'react';
import { Flex, Button, Grid, GridItem, Image, Text, Divider } from "@chakra-ui/react"
import { useHistory } from "react-router-dom";

import '../../Sass/pages/Home.sass';

import processImage from '../../../Assets/undraw_Thought_process_re_om58.svg';
import bundleImage from '../../../Assets/undraw_File_bundle_re_6q1e.svg';

import {
	Switch,
	useColorMode,
    Heading
} from '@chakra-ui/react';

export default function Home() {

    const { colorMode, toggleColorMode } = useColorMode();

    const history = useHistory();

    function goTo(path: string, flow: string) {
        history.push(`${path}/${flow}`);
    }

    return (
        <Flex direction={'column'} alignItems={'center'} style={{padding: '0 3em'}}>
                {/* <Switch isChecked={colorMode == 'dark'} onChange={toggleColorMode}></Switch> */}
                <Heading display={'flex'} height={'10vh'} alignItems={'center'} style={{textTransform: 'uppercase'}}>search for vulnerabilities</Heading>
                <Grid templateColumns="1fr 2fr 4fr 1fr" height="45vh" alignContent="center">
                    <GridItem></GridItem>
                    <GridItem>
                        <Image width="50em" src={processImage}></Image>
                    </GridItem>
                    <GridItem style={{padding: '2em'}}>
                        <Text fontSize="1.5em" fontWeight="medium" color="#807AE8">
                            NPM Vulnerabilities is a vulnerability search engine
                            for npm packages using security protocols and analyzing
                            the criticality criterion based on CVE database. <br/><br/>
                            By clicking the button below, you will be redirected to a process
                            that evaluates your <i>packages.json files</i>
                        </Text>
                        <Button onClick={() => goTo('keyselection', 'npm')} float='right' style={{marginTop: '1em', marginRight: '1em', textTransform: 'uppercase'}}>
                        NPM Vulnerabilities
                        </Button>
                    </GridItem>
                    <GridItem>
                    </GridItem>
                </Grid>
                <Divider></Divider>
                <Grid templateColumns="1fr 4fr 2fr 1fr" height="45vh" alignContent="center">
                    <GridItem></GridItem>
                    <GridItem style={{padding: '2em'}}>
                        <Text fontSize="1.5em" fontWeight="medium" color="#807AE8">
                            Are you a federally regulated finance institution?<br/>
                            <i>Cyber Framework</i> it's a form that approaches some security-oriented
                            topics. Those data are processed by a Framework which uses a CVE database, 
                            resulting in an output with information about improvements and attitudes to be done.
                            <br/><br/>
                            By clicking the button below, you will be redirected to a process of self-evaluation
                            for the institution that you belong.
                        </Text>
                        <Button onClick={() => goTo('keyselection', 'cyber')}  float='left' style={{marginTop: '1em', marginRight: '1em', textTransform: 'uppercase'}}>
                        Cyber Framework
                        </Button>
                    </GridItem>
                    <GridItem>
                        <Image width="50em" src={bundleImage}></Image>
                    </GridItem>
                    <GridItem>
                    </GridItem>
                </Grid>
        </Flex>
    )
}