import { Button } from "@/components/ui/button";
import connectDB from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  //  const conn = await connectDB();
  //  console.log("connection: ", conn)

  await connectDB();
  return <Button>Welcome to do List!</Button>;
}
