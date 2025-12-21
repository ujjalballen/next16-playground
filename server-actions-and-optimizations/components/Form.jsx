"use client";

import { useActionState } from "react";
import { createUserTWO } from "../actions";


export default function Form() {
  const [state, formAction, isPending] = useActionState(createUserTWO, null);

 console.log("Current useActionState:", state)
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
      {state.success && <p style={{color: 'green'}}>{state.message}</p>}
    </form>
  );
}
