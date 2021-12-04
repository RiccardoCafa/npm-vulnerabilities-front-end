import React, { useState, useEffect } from 'react';
import { Flex, Text, Heading, Grid, Box, UnorderedList, ListItem } from '@chakra-ui/layout';
import useUser from '../../../Contexts/useUser';
import { Answer, UserState } from '../data/userModel';
import Chart, { ChartDataset } from 'chart.js/auto';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cveResult1 from '../../../mock/cve-result-1.json';
import cveResult2 from '../../../mock/cve-result-2.json';

interface FocusResult {
    Comment: string;
    Nota: number,
    Result: {
        [category: string]: number
    }
}

interface Result {
    [focus: string]: FocusResult;
}

interface RouteParams {
    apiKey: string;
}

export default function CyberResult() {

    const [answers, setAnswers] = useState<Answer[]>();
    const [lastResult, setLastResult] = useState<Result>();
    const [apiKey, setApiKey] = useState('');

    const user = useUser();
    const params = useParams<RouteParams>();

    const colors = [
        {
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        },
        {
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        },
        {
            backgroundColor: 'rgb(8, 84, 134, 0.1)',
            borderColor: 'rgb(8, 84, 134)',
            pointBackgroundColor: 'rgb(8, 84, 134)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(8, 84, 134)'
        }
    ]

    useEffect(() => {
        //setAnswers(user.answers);
        //setApiKey(user.apiKey); //user.apiKey

        setApiKey(params.apiKey);

        async function fetchData() {
            // 
            
            var resp = await axios.get(`http://localhost:1323/answers/${params.apiKey}`);

            const labels = [ 'Governance', 'Identify', 'Defend', 'Detect', 'Respond', 'Recover', 'Learn', 'Third Party Providers' ];

            // var resp = {
            //     data: [
            //         cveResult1 as Result,
            //         cveResult2 as Result
            //     ]
            // }

            if (resp.data) {
                var data: Result[] = resp.data as Result[];

                data = data.reverse();
                
                var datasets: ChartDataset<"radar", number[]>[] = [];

                if (data.length > 0) {
                    setLastResult(data[0]);
                }
                var count = 0;
                data.forEach((result: Result, index) => {
                    if (count >= 3) return;
                    var chartData: number[] = [];
                    labels.forEach((label) => {
                        var res = result[label];
                        if (res == undefined) {
                            chartData.push(0);
                        } else {
                            chartData.push(result[label].Nota / 5.0);
                        }
                    });

                    datasets.push({
                        label: "#" + count,
                        data: chartData,
                        backgroundColor: colors[count].backgroundColor,
                        borderColor: colors[count].borderColor,
                        pointBackgroundColor: colors[count].pointBackgroundColor,
                        pointBorderColor: colors[count].pointBorderColor,
                        pointHoverBackgroundColor: colors[count].pointHoverBackgroundColor,
                        pointHoverBorderColor: colors[count].pointHoverBorderColor
                    })

                    count++;
                });
                
                datasets.push({
                    label: '',
                    data: [0, 1],
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'rgba(0,0,0,0)',
                    pointBackgroundColor: 'rgba(0,0,0,0)',
                    pointBorderColor: 'rgba(0,0,0,0)',
                    pointHoverBackgroundColor: 'rgba(0,0,0,0)',
                    pointHoverBorderColor: 'rgba(0,0,0,0)'
                })

                var ctx = document.getElementById('radarchart') as HTMLCanvasElement;

                var chart = new Chart(ctx, {
                    type: 'radar',
                    options: {
                        elements: {
                            line: {
                                borderWidth: 3
                            }
                        },
                        responsive: false
                    },
                    data: {
                        labels: labels,
                        datasets: datasets
                    }
                })

            }

        } 
        
        fetchData();
    }, [])

    function getLastResultTable(label: string, color: string) {
        if (lastResult != undefined) {
            var result: FocusResult | undefined = lastResult[label];

            var notas = [];
            
            if (result == undefined) {
                return <Box style={{margin: '1em', border: '1px solid black', borderRadius: '.2em', padding: '1em'}}>
                <Text style={{fontSize: '1.5em', color: color, textTransform: 'uppercase'}} color={color}>{label}</Text>
                <Text style={{fontSize: '1em', color: 'black'}}><i>No answers</i></Text>
            </Box>
            }

            for(var categ in result.Result) {
                const value = result.Result[categ];
                notas.push(<ListItem style={{fontSize: '1em'}}>{categ}: <b>{value.toFixed(2)}</b></ListItem>)
            }

            return <Box style={{margin: '1em', border: '1px solid black', borderRadius: '.2em', padding: '1em'}}>
                <Text style={{fontSize: '1.5em', color: color, textTransform: 'uppercase'}} color={color}>{label}</Text>
                <Text style={{fontSize: '1em', color: 'black'}}><i>{result.Comment}</i></Text>
                <Text style={{marginTop: '1.5em'}}>NOTAS</Text>
                <UnorderedList>
                    {notas.map((nota) => {
                        return nota;
                    })}
                </UnorderedList>
            </Box>

        }
        
    }

    return (
        <>
            <Text style={{fontSize: '.7em', marginLeft: '.2em'}}>Key: {apiKey}</Text>
            <Flex display={'flex'} flexDirection={'column'} justifyContent={'center'} alignContent={'center'}>
                <Heading size={'lg'} alignSelf={'center'} marginBottom={'2em'}>This chart is the result from your answers</Heading>
                <canvas id="radarchart" width='500' height='500' style={{alignSelf: 'center'}}></canvas>
            </Flex>
            <div style={{padding: '0 2em'}}>
                <Text style={{fontSize: '2em', marginTop: '1em', alignSelf: 'center', justifySelf: 'center', textTransform: 'uppercase'}}>From your last result</Text>
                <Grid templateColumns='repeat(3, 1fr)'>
                    {getLastResultTable('Governance', 'orange.500')}
                    {getLastResultTable('Identify', 'teal.700')}
                    {getLastResultTable('Defend', 'purple.700')}
                    {getLastResultTable('Detect', 'green.500')}
                    {getLastResultTable('Respond', 'purple.700')}
                    {getLastResultTable('Recover', 'gray.600')}
                    {getLastResultTable('Learn', 'blue.500')}
                    {getLastResultTable('Third Party Providers', 'purple.700')}
                </Grid>
            </div>
        </>
    )
}