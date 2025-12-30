const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.j@example.com",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.s@example.com",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie.b@example.com",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.p@example.com",
  }
];

export async function GET(request) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Response.json(users);
}


export async function POST(request){
  const body = await request.json();
  const newUser = {
    id: Date.now(),
    name: body.name,
    email: body.email
  }

  users.push(newUser);

  await new Promise((resolve) => setTimeout(resolve, 500))
  return Response.json(newUser)
}