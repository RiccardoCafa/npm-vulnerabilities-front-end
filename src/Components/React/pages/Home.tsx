import React from 'react';
import { Flex, Button, Grid, GridItem, Image, Text, Divider } from "@chakra-ui/react"
import { useHistory } from "react-router-dom";

import '../../Sass/pages/Home.sass';

import processImage from '../../../Assets/undraw_Thought_process_re_om58.svg';
import bundleImage from '../../../Assets/undraw_File_bundle_re_6q1e.svg';

import {
	Switch,
	useColorMode
} from '@chakra-ui/react';

export default function Home() {

    const { colorMode, toggleColorMode } = useColorMode();

    const history = useHistory();

    function goTo(path: string) {
        history.push(path);
    }

    return (
        <Flex direction={'column'} justifyContent={'center'} style={{padding: '0 3em'}}>
                <Switch isChecked={colorMode == 'dark'} onChange={toggleColorMode}></Switch>
                <Grid templateColumns="1fr 2fr 4fr 1fr" height="50vh" alignContent="center">
                    <GridItem></GridItem>
                    <GridItem>
                        <Image width="50em" src={processImage}></Image>
                    </GridItem>
                    <GridItem style={{padding: '2em'}}>
                        <Text fontSize="1.5em" fontWeight="medium" color="#807AE8">
                            NPM Vulnerabilities é um mecanismo de busca por vulnerabilidades
                            em pacotes npm utilizando protolos de segurança CVE e analisando
                            o critério de criticidade.
                        </Text>
                        <Button onClick={() => goTo("npm")} float='right' style={{marginTop: '1em', marginRight: '1em'}}>
                        NPM Vulnerabilities
                        </Button>
                    </GridItem>
                    <GridItem>
                    </GridItem>
                </Grid>
                <Divider></Divider>
                <Grid templateColumns="1fr 4fr 2fr 1fr" height="50vh" alignContent="center">
                    <GridItem></GridItem>
                    <GridItem style={{padding: '2em'}}>
                        <Text fontSize="1.5em" fontWeight="medium" color="#807AE8">
                            Cyber Framework é um formulário para coleta de informações acerca
                            de CVEs e medidas de seguranças adotadas por empresas. Assim como
                            para o estudo dessas informações por fins acadêmicos.
                        </Text>
                        <Button onClick={() => goTo("cyber")}  float='left' style={{marginTop: '1em', marginRight: '1em'}}>
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