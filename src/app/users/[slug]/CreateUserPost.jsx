'use client';
import { useRouter } from 'next/navigation';
import {useState} from 'react';
import {Box, 
    Input, 
    FormControl, 
    FormLabel, 
    Button,
    ButtonGroup,
    useToast} from '@chakra-ui/react';

export default function CreateUserPost(props){
    const router = useRouter();
    const toast = useToast();
    const [postData, setPostData] = useState({
        title: '',
        body: ''
    });

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setPostData((previous) => {
            return {
                ...previous,
                [name]: value
            }
        })
    }

    const submitHandler = async () => {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/public/v2/users/${props.userId}/posts`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(postData),
          })
        if(response.ok){
            toast({
                title: 'Post created.',
                description: "We've created your post for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            router.refresh();
        }
        else{
            toast({
                title: 'Post not created.',
                description: "Post couldn't be created",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return <>
        <Box width={'300px'}>
            <form>
                <FormControl marginBlockEnd={1}>
                    <FormLabel>Title</FormLabel>
                    <Input name="title" type="text" placeholder="Enter your name" onChange={changeHandler} />
                </FormControl>
                <FormControl marginBlockEnd={1}>
                    <FormLabel>Body</FormLabel>
                    <Input name="body" type="text" placeholder="Enter your name" onChange={changeHandler} />
                </FormControl>
                
                <ButtonGroup gap={2} my={2} display={'flex'} justifyContent={'end'}>
                    <Button 
                    onClick={() => {
                        submitHandler();
                    }} 
                    colorScheme="blue" 
                    mr={2}>
                        Create
                    </Button>
                </ButtonGroup>
            </form>
        </Box>
    </>
}