"use client";

import { useActionState } from "react";
import { createUserTWO } from "../actions";

export default function Form() {
  const [formState, formAction, isPending] = useActionState(createUserTWO, null);

  return (
    <form action={formAction}>
      <input
        type="text"
        name="email"
        id=""
        className="border border-amber-300"
      />
      <br />
      <button type="submit" className="border border-amber-700 cursor-pointer">
        Create
      </button>
      {state.error && <p>{state.message}</p>}
      {formState?.success && (
      <p className="bg-green-700 text-white my-3 w-64 p-2 rounded-sm">
        {formState?.message}
      </p>
      )}
    </form>
  );
}
