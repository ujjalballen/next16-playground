export default async function Home() {

  console.log("I'm from the SERVER!")

  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const datas = await response.json();

  return (
    <div className="min-h-screen bg-zinc-50 font-san">
      {
        datas.map(user => (
         <div key={user.id} className="border-2 border-amber-300">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
         </div>
        ))
      }
    </div>
  );
}
