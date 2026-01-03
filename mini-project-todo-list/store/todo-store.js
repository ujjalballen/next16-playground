import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTodoStore = create(
  devtools(
    (set, get) => ({
      todos: [],
      filter: "all",
      isLoading: false,

      setTodos: (todos) => set({ todos }),
      addTodo: (todo) =>
        set((state) => ({
          todos: [todo, ...state.todos],
        })),
      setFilter: (filter) => set({ filter }),
      setLoading: (isLoading) => set({ isLoading }),

      // Remove the functions from here and use selectors instead
      // filteredTodos: ...
      // completedCount: ...
      // activeCount: ...
    }),
    { name: "todo-store" }
  )
);

// In your component file, you would define selectors:

export const selectFilteredTodos = (state) => {
  console.log("todos: ", state.todos); // This log will run when state changes
  switch (state.filter) {
    case "active":
      return state.todos.filter((todo) => !todo.completed);
    case "completed":
      return state.todos.filter((todo) => todo.completed);
    default:
      return state.todos;
  }
};

export const selectCompletedCount = (state) =>
  state.todos.filter((todo) => todo.completed).length;

export const selectActiveCount = (state) =>
  state.todos.filter((todo) => !todo.completed).length;

// How to use it:

// const filteredTodos = useTodoStore(selectFilteredTodos);
// const activeCount = useTodoStore(selectActiveCount);

// import { create } from "zustand";
// import { devtools } from "zustand/middleware";

// export const useTodoStore = create(
//   devtools(
//     (set, get) => ({
//       todos: [],
//       filter: "all",
//       isLoading: false,

//       setTodos: (todos) => set({ todos }),

//       addTodo: (todo) =>
//         set((state) => ({
//           todos: [todo, ...state.todos],
//         })),

//       setFilter: (filter) => set({ filter }),
//       setLoading: (isLoading) => set({ isLoading }),

//       filteredTodos: () => {
//         const { todos, filter } = get();
//         console.log("todos: ", todos)
//         switch (filter) {
//           case "active":
//             return todos.filter((todo) => !todo.completed);
//           case "completed":
//             return todos.filter((todo) => todo.completed);
//           default:
//             return todos;
//         }
//       },

//       completedCount: () => get().todos.filter((todo) => todo.completed).length,
//       activeCount: () => get().todos.filter((todo) => !todo.completed).length,
//     }),
//     { name: "todo-store" }
//   )
// );
