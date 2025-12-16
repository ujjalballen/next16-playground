import dbConnect from "../../lib/db";

export default async function Home() {

  await dbConnect()

  return (
    <div className="min-h-screen bg-zinc-50 font-san">
      <h1>Note APP</h1>
    </div>
  );
}
