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
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan.h@example.com",
  },
  {
    id: 6,
    name: "Fiona Glenanne",
    email: "fiona.g@example.com",
  },
  {
    id: 7,
    name: "George Kirk",
    email: "george.k@example.com",
  },
  {
    id: 8,
    name: "Hannah Abbott",
    email: "hannah.a@example.com",
  },
  {
    id: 9,
    name: "Ian Malcolm",
    email: "ian.m@example.com",
  },
  {
    id: 10,
    name: "Jenna Maroney",
    email: "jenna.m@example.com",
  },
];

export async function GET(request) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Response.json(users);
}
