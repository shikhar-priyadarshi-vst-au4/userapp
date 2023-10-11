'use client';

import {Button, 
        Modal, 
        ModalHeader,
        ModalBody, 
        ModalContent,
        ModalCloseButton,
        ModalOverlay,
        useDisclosure } from '@chakra-ui/react';

export default function CreateUserModal(props){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return <>
    <Button onClick={onOpen} my={2}>Create User</Button>
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.children({
                isOpen,
                onOpen,
                onClose
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </> 
}