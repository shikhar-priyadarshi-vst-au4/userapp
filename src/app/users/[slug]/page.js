import { revalidateTag } from 'next/cache'
import CreateUserPost from "@/app/users/[slug]/CreateUserPost";
import UserPostCard from "@/app/users/[slug]/UserPostCard";
import UserCard from "@/app/users/UserCard";
import { Box, Flex, Text } from "@chakra-ui/layout";

async function getUserDetails(userId) {
    const res = await fetch(`${process.env.API_DOMAIN}/public/v2/users/${userId}`)
    if (!res.ok)
        return []
    //   throw new Error('Failed to fetch data')
    return res.json()
}

async function getUserPosts(userId){
    const posts = await fetch(`${process.env.API_DOMAIN}/public/v2/users/${userId}/posts`, { next: { tags: ['posts'] } });
    if(!posts.ok)
        return []
        // throw new Error('Failed to fetch data')
    return posts.json()
}

async function getUserComments(userId){
    const comments = await fetch(`${process.env.API_DOMAIN}/public/v2/users/${userId}/comments`, { next: { tags: ['comments'] } });
    if(!comments.ok)
        return [];
        // throw new Error('Failed to fetch data')
    return comments.json()
}

export default async function UserDetails({ params }){
    const userId = params.slug;
    const userDetailsData = getUserDetails(userId);
    const postsData = getUserPosts(userId);
    const commentsData = getUserComments(userId);

    const [userDetails, posts, comments] = await Promise.all([userDetailsData, postsData, commentsData]);

    return <Box>
        <Text fontSize={'2xl'} fontWeight={600} my={2}>UserDetails</Text>
        <Flex gap={5}>
            <UserCard user={userDetails}/>
            <Flex flexDirection={"column"} gap={3}>
                {posts.map((post) => 
                    <UserPostCard post={post} comments={comments}/>)}
            </Flex>
            <CreateUserPost userId={userId}/>
        </Flex>
    </Box>
}