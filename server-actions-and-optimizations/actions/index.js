"use server";

export async function createUser(formData) {
  const name = formData.get("name");

  console.log("Created User: ", name);
}

export async function createUserTWO(previousState, formData) {
  try {
    const name = formData.get("email");

    console.log("Created User: ", name);

    return { success: true, data: name, message: "Successfully" };
  } catch (error) {
    return { success: false, error: true, message: "Failed to save item." };
  }
}
