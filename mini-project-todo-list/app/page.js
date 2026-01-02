import { TodoForm } from "@/components/todo-form";
import { Button } from "@/components/ui/button";
import connectDB from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  //  const conn = await connectDB();
  //  console.log("connection: ", conn)

  await connectDB();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Todo App</h1>
          <p>Bild with next.js, Zustand, TanStack query, zod &Mongoose</p>
        </header>
        <main>
          <TodoForm />
        </main>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>This app demostrates CRUD operations with modern React patterns</p>
        </footer>
      </div>
    </div>
  );
}
