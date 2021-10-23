import React, {useState, useEffect} from 'react';

import { useHistory, useParams } from 'react-router-dom';

import {
    Flex,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
} from '@chakra-ui/react';

import '../../Sass/pages/Cyber.sass';

import fwQuestionData from '../data/fwQuestionData';

import questionsData from '../../../mock/cve-form.json';
import FwQuestion from '../component/FwQuestion';

interface RouteParams {
    apiKey: string;
}

export default function CyberMenu() {

    const [apiKey, setApiKey] = useState('');
    const [questions, setQuestions] = useState<fwQuestionData[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

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
        setApiKey(params.apiKey);

        if (!params.apiKey) {
            history.push('keyselection/cyber');
        }

        setQuestions(questionsData);
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

    return (
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
                            <FwQuestion data={getQuestionByFocus(type.focus)} color={type.color} myIndex={index} currentTabIndex={currentIndex}></FwQuestion>
                        </TabPanel>
                    )}
                </TabPanels>
            </Tabs>
        </Flex>
    )
}