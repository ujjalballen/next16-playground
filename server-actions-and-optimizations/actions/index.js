"use server";

export async function createUser(formData) {
  const name = formData.get("name");

  console.log("Created User: ", name);
}

export async function createUserTWO(previousState, formData) {
  const name = formData.get("email");

  console.log("Created User: ", name);
  console.log("prev State: ", previousState)

  return { success: true, data: name, message: "Successfully" };
}
