import React from 'react';

import {
    Flex,
    Heading,
    Collapse,
    Text,
    useBoolean,
    Button,
    Divider
} from '@chakra-ui/react';

export default function RatingExplain({rating}: {rating: {level: number, title: string, content: JSX.Element}}) {

    const [showFullText, setShowFullText] = useBoolean();

    return (
        <Flex  direction={'column'}>
            <Heading size={'sm'}>
                Level {rating.level} - {rating.title}
            </Heading>
            <Collapse startingHeight={20} in={showFullText}>
                <Text>
                    {rating.content}
                </Text>
            </Collapse>
            <Button size="sm" onClick={setShowFullText.toggle} marginTop={'1em'} mt="1rem">
                Show {showFullText ? "Less" : "More"}
            </Button>
            <Divider marginTop={'1em'} marginBottom={'1em'}></Divider>
        </Flex>
    )
}