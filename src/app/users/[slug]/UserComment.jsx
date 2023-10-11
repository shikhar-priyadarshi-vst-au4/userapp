'use client';
import {Card,
        CardHeader,
        CardBody,
        Box,
        Heading,
        Text,
        Stack,
        StackDivider,
        Textarea} from '@chakra-ui/react';

export default function UserComment({comments = [
    {title: 'lajdslkjda', description: 'jshddhjjahjajkbsabd'}
]}){
    return <>
    <Card backgroundColor={'gray.100'} mt={2}>
  <CardHeader>
    <Heading size='md'>Comments</Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      {comments.map((comment, index) => 
      <Box key={index}>
        <Heading size='xs' textTransform='uppercase'>
          {comment.title}
        </Heading>
        <Text pt='2' fontSize='sm'>
          {comment.description}
        </Text>
      </Box>)}
      <Box>
        <Textarea backgroundColor={'white'} placeholder='Here is a sample placeholder'/>
      </Box>
    </Stack>
  </CardBody>
</Card>
    </>
}