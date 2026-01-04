"use client"; // as it's parent "use client", so it will also be a automatic client component

import { useGetAllTodos } from "@/hooks/use-create-todo";
import { Card, CardContent } from "./ui/card";
import { Loader2 } from "lucide-react";
import { selectFilteredTodos, useTodoStore } from "@/store/todo-store";
import TodoItem from "./todo-item";
import { useMemo } from "react";

export default function TodoList() {
  const { data: todos, isPending, isError, error } = useGetAllTodos();
  console.log("Data: ", todos);

  // const filteredTodos = useTodoStore(selectFilteredTodos);

  // --- FIX IS HERE ---
  // We use useTodoStore to get the entire state object needed by the selector
  const storeState = useTodoStore();

  // Then we use useMemo to cache the result of the selector function
  const filteredTodos = useMemo(
    () => selectFilteredTodos(storeState),
    [storeState]
  );

  console.log("filteredTodos:", filteredTodos);

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

  if (filteredTodos.length === 0) {
    return (
      <Card>
        <CardContent className={"p-8 text-center"}>
          <p className="text-muted-foreground">
            {todos?.length === 0
              ? "No todos yet. Create your first one!"
              : "No todos match the current filter"}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}
