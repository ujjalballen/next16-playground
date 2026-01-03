"use client";

import { useGetAllTodos } from "@/hooks/use-create-todo";
import { Card, CardContent } from "./ui/card";
import { Loader2 } from "lucide-react";

export default function TodoList() {
  const { data: todos, isPending, isError, error } = useGetAllTodos();

  if (isPending) {
    return (
      <Card>
        <CardContent className={"p-8 text-center"}>
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading todos....</p>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className={"p-8 text-center"}>
          <p className="text-destructive">
            Error: loading todos: {error.message}
          </p>
        </CardContent>
      </Card>
    );
  }

  return <div>do</div>;
}
