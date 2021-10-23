import React, { useState, useEffect } from 'react';

import {
    Slider,
    Text,
    Badge,
    Button,
    Editable,
    EditablePreview,
    EditableInput,
    Flex,
    SliderTrack,
    Box,
    SliderThumb,
    SliderFilledTrack,
    Heading,
    Link,
    useBoolean,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Collapse,
    Tooltip
} from '@chakra-ui/react';
import fwQuestionData from '../data/fwQuestionData';
import RatingExplain from './RatingExplain';

export default function FwQuestion({data, color, myIndex, currentTabIndex}: {data: fwQuestionData[], color: string, myIndex: number, currentTabIndex: number}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<fwQuestionData>(
        {
            category: "",
            content: "",
            focus: "",
            number: 1
        }
    );

    const [actualValue, setActualValue] = useState(2);

    const [showRatings, setShowRatings] = useBoolean();
    const [skippedAnswer, setSkippedAnswer] = useBoolean();

    const ratingExplaination = [
        {
            level: 0,
            title: "Non-existent",
            content: <>At this level, the identified control has not been implemented and may not even be discussed or understood, within the organization.</>
        },
        {
            level: 1,
            title: "Initial",
            content: <>Controls at this level are generally undocumented and in a state of dynamic change, tending to be considered and implemented in an ad hoc, and reactive manner by individual personnel or based upon individual events. <br/>For example, Threat and Risk Assessments may sometimes be carefully executed, while in other instances they are completed in a rushed, and haphazard manner. <br/>At maturity Level 1 organizations often implement security systems and services that work; however, they may be unequally applied, gaps and deficiencies will remain, and projects may go over budget or miss deadlines.</>
        },
        {
            level: 2,
            title: "Repeatable",
            content: <>At Level 2, an organization implements controls in a repeatable manner, across different systems and environments, with more consistent outcomes as a result. As well, documenting and applying security requirements and structured processes has become more common, with services also managed. <br/>The status of work, control(s) implementation and the resultant delivery of security services are visible to management at regular intervals. <br/>However, there may not be suitable documentation explaining implemented controls, and how they are to be used in the organization. The understanding as to how  controls work and are implemented may be limited to specific individuals, resulting in a potential challenge in accessing that knowledge and experience if those individuals are unavailable.</>
        },
        {
            level: 3,
            title: "Defined",
            content: <>At Level 3, Cyber Security controls are well-defined and understood, and are described in documentation which may include policies, standards, procedures, and configurations, so that they can be explained and consistently applied across the organization (with exceptions possible, if they are also documented and approved).<br/>As well, controls are subject to some degree of improvement (e.g., adjustment, enhancement, or replacement) over time. <br/>Controls are also reviewed and managed more proactively with some understanding as to the inter-dependencies between those controls. Level 3 can be considered a developmental stage with the organization demonstrating commitment to cyber security and an interest in improvement, but with some room for further improvement.</>
        },
        {
            level: 4,
            title: "Quantitatively Managed",
            content: <>At Level 4, the organization sets targets for quantitative objectives for control effectiveness, performance and quality and gathers metrics to use in analysis and planning. Quantitative objectives are largely linked to the business, operational and security requirements, which are gathered from a range of sources including close consultation with significant stakeholders. <br/>As metrics are gathered, and analyzed, it becomes possible for the organization to define normal operating patterns and then predict control performance. <br/>Subsequently, controls (and related systems or services) are monitored to determine if they are operating within defined parameters. If they are not, personnel can be alerted (e.g., as to anomalous events or patterns) and can take appropriate action. <br/>At Level 4, personnel will also demonstrate deeper and more comprehensive understanding of and competence with the implemented cyber security controls in multiple and varied situations.</>
        },
        {
            level: 5,
            title: "Continuous Improvement",
            content: <>At Level 5, the organization focuses on continually improving controls to address changing business needs, emerging threats and risks and other factors. <br/>This is done through both incremental and innovative technological improvements, process refinement, and the continuous education of personnel. <br/>At Level 5, the organization may also become more agile, to rapidly respond to changes and opportunities internally and external to the organization. <br/>Overall, the organization has progressed to the point that cyber security and Risk Management have become part of the culture, with all personnel collaborating to use and maintain controls and best practices in their daily work, and during planning.</>
        }
    ];

    useEffect(() => {
        if (data.length > 0) {
            setCurrentQuestion(data[currentIndex]);
        }

    }, [data])

    function goToQuestion(qst: string) {
        let qstNumber: number = parseInt(qst);
        qstNumber = qstNumber - 1;
        if (qstNumber < data.length && qstNumber >= 0) {
            let currentQst = data[qstNumber];
            setCurrentIndex(qstNumber);
            setCurrentQuestion(currentQst);
            
            if (currentQst.skipped && currentQst.skipped) {
                setSkippedAnswer.off();
            } else {
                setSkippedAnswer.on();
            }
        }
    }

    function skipQuestion() {
        currentQuestion.skipped = true;
        goToQuestion((currentIndex + 2).toString());
    }

    function answerQuestion() {
        currentQuestion.skipped = false;
        setSkippedAnswer.on();
    }

    function onRatingChange(e: number) {
        setActualValue(e);
    }

    return (
        <>
        {
            myIndex === currentTabIndex ?
        
            <Flex direction={'column'} display={'flex'} justifyContent={'center'} justifyItems={'center'} alignContent={'center'} alignItems={'center'} width={'80%'}>
                <Flex direction={'row'} justifyContent={'space-around'} marginBottom={'2em'}>
                    {/* <Heading>
                    #{currentQuestion?.Number}
                </Heading> */}
                    <Badge colorScheme={color.replace(/\..*$/g, '')} variant={'subtle'} fontWeight={'bold'} fontSize={'x-large'}>{currentQuestion?.category}</Badge>
                </Flex>
                <Heading size={'sm'} marginBottom={'0.5em'}>Evaluate how much this affirmation regards to your company</Heading>
                <Box style={{minHeight: '20vh', width: '40vw', marginBottom: '2em'}} borderWidth="1px" borderRadius="lg" padding={'1em'}>
                    <Text width={'80%'} fontSize={'md'} textAlign={'justify'}>
                        {currentQuestion?.content}
                    </Text>
                </Box>
                {
                    currentQuestion.skipped ?
                    <Badge variant={'outline'}>Skipped</Badge>
                    :
                    <Slider defaultValue={2} min={0} max={5} step={1} onChange={onRatingChange}>
                        <SliderTrack bg="red.100">
                            <Box position="relative" />
                            <SliderFilledTrack bg={color} />
                        </SliderTrack>
                        <Tooltip label={"rate of " + actualValue} isOpen placement='top'>
                            <SliderThumb bg={color} boxSize={6} />
                        </Tooltip>
                    </Slider>
                }
                <Text size='sm' style={{marginTop: '1.2em'}}>
                    <Link color="teal.500" onClick={setShowRatings.toggle}>
                        What that value means?
                    </Link>
                </Text>
                <Flex direction={'row'} style={{marginTop: '2em', width: '100%', marginBottom: '2em'}} justifyContent={'space-around'}>
                    <Button onClick={() => goToQuestion((currentIndex).toString())}>PREVIOUS</Button>
                    {
                        currentQuestion.skipped ?
                        <Button onClick={() => answerQuestion()}>ANSWER</Button>
                        : <Button onClick={() => skipQuestion()}>SKIP</Button>
                    }
                    <Button onClick={() => goToQuestion((currentIndex + 2).toString())}>NEXT</Button>
                </Flex>
                <Flex direction={'row'} width={'50%'} alignContent={'center'} justifyContent={'center'} >
                    <Text marginRight={'1em'}>
                        Question:
                    </Text>
                    <Editable width={'10'} defaultValue="0" value={currentQuestion.number.toString()} onChange={(e) => goToQuestion(e)} >
                        <EditablePreview />
                        <EditableInput type={'number'} />
                    </Editable>
                </Flex>
            </Flex>
        
        : <></>}
        <Modal isOpen={showRatings} onClose={setShowRatings.toggle} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Rating meaning</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {ratingExplaination.map((rating) => 
                    <RatingExplain rating={rating}></RatingExplain>
                )}
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}