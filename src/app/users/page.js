import {Grid} from "@chakra-ui/react";
import UserCard from "@/app/users/UserCard";
import CreateUserForm from "@/app/users/CreateUserForm";

async function getData() {
    const res = await fetch(`${process.env.API_DOMAIN}/public/v2/users?page=1&per_page=100`, { next: { tags: ['users'] }, cache: 'no-store' })
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    return res.json()
}

export default async function Users(props){
    const data = await getData();

    return <>
    <CreateUserForm />
    <Grid gap={2} templateColumns={['1fr', 'repeat(4, 25%)']}>
        {data.map((user) => <UserCard user={user}/>)}
    </Grid>
    </>
    
}