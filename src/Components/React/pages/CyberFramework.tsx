import React, {useState, useEffect} from 'react';

import { useHistory, useParams } from 'react-router-dom';

import {
    Flex,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
    Text,
    Button
} from '@chakra-ui/react';

import '../../Sass/pages/Cyber.sass';

import fwQuestionData from '../data/fwQuestionData';

import questionsData from '../../../mock/cve-form.json';
import FwQuestion from '../component/FwQuestion';
import useUser from '../../../Contexts/useUser';
import axios from 'axios';

interface RouteParams {
    apiKey: string;
}

export default function CyberMenu() {

    const [apiKeyValue, setApiKey] = useState('');
    const [questions, setQuestions] = useState<fwQuestionData[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const { answers, setUserState } = useUser();

    const questionTypes = [
        {
            focus: "Governance",
            color: "orange.500"
        },
        {
            focus: "Identify",
            color: "teal.700"
        },
        {
            focus: "Defend",
            color: "purple.700"
        },
        {
            focus: "Detect",
            color: "green.500"
        },
        {
            focus: "Respond",
            color: "purple.700"
        },
        {
            focus: "Recover",
            color: "gray.600"
        },
        {
            focus: "Learn",
            color: "blue.500"
        },
        {
            focus: "Third Party Providers",
            color: "purple.700"
        }
    ]

    const params = useParams<RouteParams>();
    const history = useHistory();

    useEffect(() => {
        if (params.apiKey === "") {
            params.apiKey = "5e3b54cb-d84c-4ac4-b663-dafab6470d56";
        }

        setApiKey(params.apiKey);

        if (!params.apiKey) {
            history.push('keyselection/cyber');
        }

        axios.get('http://localhost:1323/questions', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            if (resp.data) {
                setQuestions(resp.data as fwQuestionData[]);
                console.log('questions: got data from server');
            } else {
                setQuestions(questionsData);
                console.log('questions: got data from local server');
            }
        });

    }, []);

    function getQuestionByFocus(focus: string): fwQuestionData[] {
        const quests: fwQuestionData[] = questions.reduce((acc, current) => {
            if (current.focus.toLowerCase() === focus.toLowerCase()) {
                acc.push(current);
            }
            return acc;
        }, [] as fwQuestionData[]);

        if (quests == undefined) {
            return [];
        }

        return quests as fwQuestionData[];
    }

    function onIndexChange(index: number) {
        setCurrentIndex(index);
    }

    function updateQuestion(question: fwQuestionData) {
        answers[question.id - 1].rate = question.rate ?? 0;
        answers[question.id - 1].skipped = question.skipped;

        setUserState({
            answers: answers,
            apiKey: apiKeyValue
        });

        console.log(answers);
    }

    function debugQuestion() {
        console.log(answers);
    }

    return (
        <>
        <Text style={{fontSize: '.7em', marginLeft: '.2em'}}>Key: {apiKeyValue}</Text>
        <Flex className="Container" style={{width: '100%'}}>
            <Tabs style={{width: '60vw'}} onChange={onIndexChange}>
                <TabList style={{alignContent: 'center', justifyContent: 'center'}}>
                    {questionTypes.map((type, _) => 
                        <Tab _selected={{ color: "white", bg: type.color }}>{type.focus}</Tab>
                    )}
                </TabList>
                <TabPanels>
                    {questionTypes.map((type, index) =>
                        <TabPanel display={'flex'} justifyContent={'center'}>
                            <FwQuestion data={getQuestionByFocus(type.focus)} color={type.color} myIndex={index} currentTabIndex={currentIndex} 
                                        answers={answers} updateAnswer={updateQuestion}></FwQuestion>
                        </TabPanel>
                    )}
                </TabPanels>
            </Tabs>
            <Button onClick={debugQuestion}></Button>
        </Flex>
        </>
    )
}