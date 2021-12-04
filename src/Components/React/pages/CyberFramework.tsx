import React, {useState, useEffect} from 'react';

import { useHistory, useParams } from 'react-router-dom';

import {
    Flex,
    Tab,
    Tabs,
    TabList,
    TabPanel,
    Spinner,
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

interface QuestionDictionary {
    [questionId: number]: fwQuestionData;
}

export default function CyberMenu() {

    const [apiKeyValue, setApiKey] = useState('');
    const [questions, setQuestions] = useState<fwQuestionData[]>([]);
    const [questionsAnswered, setQuestionsAnswered] = useState<QuestionDictionary>({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTabIndex, setCurrentTabIndex] = useState(0);
    const [currentColor, setCurrentColor] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState<fwQuestionData>({
        category: '',
        content: '',
        focus: '',
        id: 0
    });
    const [isLoading, setIsLoading] = useState(false);

    const { answers, setUserState } = useUser();

    const questionTypes = [
        {
            index: 0,
            focus: "Governance",
            color: "orange.500"
        },
        {
            index: 1,
            focus: "Identify",
            color: "teal.700"
        },
        {
            index: 2,
            focus: "Defend",
            color: "purple.700"
        },
        {
            index: 3,
            focus: "Detect",
            color: "green.500"
        },
        {
            index: 4,
            focus: "Respond",
            color: "purple.700"
        },
        {
            index: 5,
            focus: "Recover",
            color: "gray.600"
        },
        {
            index: 6,
            focus: "Learn",
            color: "blue.500"
        },
        {
            index: 7,
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
                var questions: fwQuestionData[] = resp.data as fwQuestionData[];
                setQuestions(questions);
                getCurrentQuestion(questions);
                console.log('questions: got data from server');
            } else {
                setQuestions(questionsData);
                console.log('questions: got data from local server');
            }
        });
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            getCurrentQuestion(questions);
        }
    }, [currentIndex]);

    function getCurrentQuestion(data: fwQuestionData[]) {
        var currentQuestion = data[currentIndex];
        var color: string | undefined = questionTypes.find(x => x.focus == currentQuestion.focus)?.color;

        var questionAnsw = questionsAnswered[currentQuestion.id];

        if (questionAnsw) {
            currentQuestion.rate = questionAnsw.rate;
            currentQuestion.skipped = questionAnsw.skipped;
        }

        setCurrentColor(color ?? "black");
        
        setCurrentQuestion(currentQuestion);

        var index = questionTypes.find(x => x.focus == currentQuestion.focus)?.index;
        setCurrentTabIndex(index ?? 0);
    }

    function onIndexChange(index: number) {
        //setCurrentIndex(index);
        var focus = questionTypes.find(x => x.index == index)?.focus;

        if (focus) {
            var firstIndex = questions.findIndex(x => x.focus == focus);
            setCurrentIndex(firstIndex);
            setCurrentTabIndex(index);
        }
    }

    function updateQuestion(question: fwQuestionData) {
        var questionsAnsw = questionsAnswered;

        var questionToUpdate = questionsAnswered[question.id];

        if (questionToUpdate) {
            questionToUpdate.rate = question.rate;
            questionToUpdate.skipped = question.skipped;
        } else {
            questionsAnsw[question.id] = question;
        }

        setQuestionsAnswered(questionsAnsw);
        
        var index = currentIndex + 1;

        if (index < questions.length) {
            setCurrentIndex(index);
        }
    }

    function goPrevious() {
        var index = currentIndex - 1;
        if (index >= 0) {
            setCurrentIndex(index);
        }
    }

    async function submitAnswer() {
        var dataToSubmit: { id: number, rate: number }[] = [];

        for(let key in questionsAnswered) {
            const value = questionsAnswered[key];
            if (!value.skipped) {
                dataToSubmit.push({
                    id: value.id,
                    rate: value.rate ?? 0
                });
            }
        }
        
        setUserState({
            apiKey: apiKeyValue,
            answers: dataToSubmit
        });

        setIsLoading(true);

        await axios.post(`http://localhost:1323/answers/${apiKeyValue}`, dataToSubmit);

        setIsLoading(false);

        history.push(`/cyber/result/${apiKeyValue}`);
    }

    return (
        <>
        <Text style={{fontSize: '.7em', marginLeft: '.2em'}}>Key: {apiKeyValue}</Text>
        {isLoading ?
            <Spinner></Spinner>
            :
            <>
                <Flex className="Container" style={{width: '100%'}}>
                    <div style={{display:'flex',flexDirection: 'column', justifyContent:'center'}}>
                        <Tabs style={{width: '60vw'}} index={currentTabIndex} onChange={onIndexChange} isManual>
                            <TabList style={{alignContent: 'center', justifyContent: 'center'}}>
                                {questionTypes.map((type, _) => 
                                    <Tab _selected={{ color: "white", bg: type.color }}>{type.focus}</Tab>
                                )}
                            </TabList>
                        </Tabs>
                        <FwQuestion data={currentQuestion} color={currentColor} showPrevious={currentIndex > 0} updateAnswer={updateQuestion} goPrevious={goPrevious}></FwQuestion>    
                        <Button onClick={submitAnswer} color='green.700' marginTop='1em'>SUBMIT ALL ANSWERS</Button>
                    </div>
                </Flex>
            </>
        }
        </>
    )
}