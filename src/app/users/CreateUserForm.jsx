'use client';
import { useRouter } from "next/navigation";
import { useState } from 'react';
import {Box, 
        Input, 
        FormControl, 
        FormLabel, 
        Button,
        Select,
        RadioGroup,
        Stack,
        Radio,
        ButtonGroup, useToast} from '@chakra-ui/react';
import CreateUserModal from './CreateUserModal';
import submit from "../actions";

export default function CreateUserForm(){
    const router = useRouter();
    const toast = useToast();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        gender: '',
        status: ''
    });

    const changeHandler = (event) => {
        const {name, value} = 'target' in event ? event.target : event;
        setUserData((previous) => {
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

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/public/v2/users`, {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(userData),
          })
        if(response.ok){
            toast({
                title: 'User created.',
                description: "We've created your user for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            submit();
            router.refresh();
        }
        else{
            toast({
                title: 'User not created.',
                description: "User couldn't be created",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }
    
    return <>
        <CreateUserModal>
            {(modalProps) => 
            <Box>
                <form>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input name="name" type="text" placeholder="Enter your name" onChange={changeHandler} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input name="email" type="text" placeholder="Enter your email" onChange={changeHandler}/>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Gender</FormLabel>
                        <Select name="gender" placeholder='Select Gender' onChange={changeHandler}>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Status</FormLabel>
                        <RadioGroup 
                            onChange={(value) => changeHandler({
                                name: 'status',
                                value
                            })} 
                            value={userData.status}>
                            <Stack direction='row'>
                                <Radio value='active'>Active</Radio>
                                <Radio value='inactive'>InActive</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <ButtonGroup gap={2} my={2} display={'flex'} justifyContent={'end'}>
                        <Button 
                        onClick={() => {
                            submitHandler();
                            modalProps?.onClose(); 
                        }} 
                        colorScheme="blue" 
                        mr={2}>
                            Submit
                        </Button>
                        <Button onClick={modalProps?.onClose}>Close</Button>
                    </ButtonGroup>
                </form>
            </Box>}
        </CreateUserModal>
    </> 
}