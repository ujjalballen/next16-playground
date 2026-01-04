import { createTodo, getTodos, toggleTodo } from "@/actions/todo-actions";
import { useTodoStore } from "@/store/todo-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const todoKeys = {
  all: ["todo"],
  lists: () => [...todoKeys.all, "list"],
};

export function useCreateTodo() {
  const queryClient = useQueryClient();
  const addTodo = useTodoStore((state) => state.addTodo);

  return useMutation({
    mutationFn: (data) => createTodo(data),
    onSuccess: (result) => {
      console.log("ONSUCCESS RESULT: ", result);
      if (result.success) {
        // Use Zustand action to immediately update UI:

        addTodo(result.data);
        console.log("result: ", result);

        // Don't invalidate queries (usually)
        // if we invalidate then we do not need to used "Zustand action => addTodo"
        // queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
      }
    },
  });
}

export function useGetAllTodos() {
  const setTodos = useTodoStore((state) => state.setTodos);

  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: async () => {
      const result = await getTodos();
      // console.log("All data: ", result);

      if (result.success) {
        // need to update zustand store with the fetched data
        setTodos(result.data);

        return result.data;
      }

      throw new Error(result.error);
    },
  });
}


export function useToggleTodo() {
  const queryClient = useQueryClient();
  const updateTodoInStore = useTodoStore((state) => state.updateTodo)

  return useMutation({
    mutationFn: (id) => toggleTodo(id),
    onSuccess: (result, id) => {
      if (result.success) {
        updateTodoInStore(id, { completed: result.data.completed })

        queryClient.invalidateQueries({ queryKey: todoKeys.lists() })
      }
    }
  })
}


