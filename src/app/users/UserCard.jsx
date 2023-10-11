import { Image, Text, Heading, Card, CardBody, Stack, Flex } from '@chakra-ui/react';
import Link from 'next/link';

export default function UserCard({user = {}}){
    return <Link href={`/users/${user.id}`}>
        <Card width={['90%', '100%']} mx={'auto'}>
        <CardBody>
        <Image
            boxSize={'150px'}
            mx={'auto'}
            src='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg'
            alt='Green double couch with wooden legs'
            borderRadius='full'
        />
        <Stack mt='6' spacing='3'>
            <Heading size='md'>{user.name}</Heading>
            <Text>
            {user.email}
            </Text>
            <Flex gap={2}>
                <Text 
                color={'white'}
                backgroundColor='blue.600' 
                textTransform={'capitalize'} 
                px={2}
                py={1}
                borderRadius={4}
                fontSize='md'>
                    {user.gender}
                </Text>
                <Text 
                color={'white'}
                backgroundColor={user.status == "active" ? 'green.600' : 'red.600'} 
                textTransform={'capitalize'}
                px={2}
                py={1}
                borderRadius={4} 
                fontSize='md'>
                    {user.status}
                </Text>
            </Flex>
        </Stack>
        </CardBody>
    </Card>
    </Link>
}