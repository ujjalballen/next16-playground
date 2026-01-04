"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Todo from "@/models/todo";
import { createTodoSchema } from "@/validations/todo";
import { success } from "zod";

export async function createTodo(data) {
  try {
    const validatedData = createTodoSchema.parse(data);
    await connectDB();

    const todo = await Todo.create(validatedData);

    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.error("Error creating todo: ", error);

    // --- KEY CHANGE HERE ---
    if (error instanceof z.ZodError) {
      // If it's a Zod error, return structured field errors
      return {
        success: false,
        // .flatten() organizes errors by field name (e.g., { title: ['Too short'] })
        errors: error.flatten().fieldErrors,
        message: "Validation failed.",
      };
    }

    // For all other errors (DB issues, network issues, etc.) return a generic message
    return {
      success: false,
      message: error ? error.message : "Failed to create todo",
    };
  }
}

// get all todos from DB
export async function getTodos(params) {
  try {
    await connectDB();
    const todos = await Todo.find({}).sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todos)),
    };
  } catch (error) {
    console.error("Error fetching todos: ", error);
    return {
      success: false,
      error: "Faild to fetch",
    };
  }
}


export async function toggleTodo(id) {
  try {
    await connectDB();
    const todo = await Todo.findById(id);

    if (!todo) {
      return {
        success: false,
        error: "Todo not found"
      }
    }

    todo.completed = !todo.completed;

    await todo.save();

    revalidatePath("/")

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo))
    }

  } catch (error) {
    console.error("Error toggling todo:", error);
    return {
      success: false,
      error: "Faild to toggle todo"
    }
  }
}


export async function deleteTodo(id) {
  try {
    await connectDB();
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return {
        success: false,
        error: "todo not found"
      }
    }

    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo))
    }

  } catch (error) {
    console.log("Error deleting todo: ", error);
    return {
      success: false,
      error: "Faild to delete todo"
    }
  }
}