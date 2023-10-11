import { NextResponse as Response} from 'next/server';

export async function GET(request) {
    const res = await fetch(`${process.env.API_DOMAIN}/public/v2/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const product = await res.json()
    return Response.json({product})
  }

export async function POST(request) {
    const body = await request.json();
    const Authorization = request.headers.get("Authorization");
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', Authorization);

    const res = await fetch(`${process.env.API_DOMAIN}/public/v2/users?access-token=9189cd1436631ae6f06fc5aeb806c2a778542a550008bd2b9322954a95a9e1d4`, {
      method: 'POST',
      headers: myHeaders,
      body,
    })
   
    const data = await res.json()
   
    return Response.json(data)
  }