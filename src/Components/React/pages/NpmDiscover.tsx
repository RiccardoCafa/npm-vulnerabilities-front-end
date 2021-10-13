import React, {useMemo} from 'react';

import {
    Flex,
    List,
    ListItem,
    ListIcon,
    Button
} from '@chakra-ui/react';

import {
    AttachmentIcon
} from '@chakra-ui/icons';

import {useDropzone} from 'react-dropzone';

import '../../Sass/pages/NpmDiscover.sass';

export default function NpmDiscover() {
    
    const {
        getRootProps,
        getInputProps,
        acceptedFiles
      } = useDropzone({accept: 'image/*'});
    
    const files = acceptedFiles.map(file => (
        <ListItem key={file.name}>
            <ListIcon as={AttachmentIcon} color="green.500" />
            {file.name}
        </ListItem>
    ));

    return (
        <Flex align='center' justify='center' direction='column'>
            <Flex className="container" flexDirection={'column'} style={{marginTop: '3em'}}>
                <div {...getRootProps({className: 'dropzone-container'})}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                    <h4>Files</h4>
                    <List>
                        {files}
                    </List>
                    <Button
                        mt={4}
                        // isLoading={props.isSubmitting}
                        type="submit"
                        disabled={files.length == 0}
                    >
                        send packages to analyse
                    </Button>
                </aside>
            </Flex>
        </Flex>
    )
}