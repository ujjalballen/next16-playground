export default async function Home() {

  const response = await fetch("http://localhost:3000/api/users");
  const users = await response.json();
console.log(users)
  return (
    <div className="min-h-screen bg-zinc-50 font-san">
      {
        users.datas.map(user => (
         <div key={user.id} className="border-2 border-amber-300">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
         </div>
        ))
      }
    </div>
  );
}
