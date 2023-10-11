'use client';
import { Text, Heading, Card, CardHeader, CardBody, CardFooter, Stack, Flex, Button, Avatar, Box, IconButton } from '@chakra-ui/react';
import { BiChat } from 'react-icons/bi';
import { useState } from 'react';
import UserComment from './UserComment';

export default function UserPostCard({post= {}}){
    const [showComment, setComment] = useState(false);
    return <Card maxW='md' marginLeft={6}>
    <CardHeader>
        <Box>
            <Heading size='sm'>{post.title}</Heading>
        </Box>
    </CardHeader>
    <CardBody>
      <Text>
        {post.body}
      </Text>
    </CardBody>
    <CardFooter
      justify='space-between'
      flexDirection={'column'}
      flexWrap='wrap'
      sx={{
        '& > button': {
          minW: '136px',
        },
      }}
    >
      <Button flex='1' variant='ghost' leftIcon={<BiChat />} onClick={() => setComment(true)}>
        Comment
      </Button>
      {showComment && <UserComment/>}
    </CardFooter>
  </Card>
}