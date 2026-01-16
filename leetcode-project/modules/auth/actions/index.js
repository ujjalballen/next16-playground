"use server";

import { database } from "@/lib/db";
import { currentUser } from "@/lib/supabase/current-user";

// get current user
// export const currentUser = async () => {
//   const supabase = await createSupabaseServerClient();
//   const { data: { user }, error } = await supabase.auth.getUser();

//   if (error) {
//     return null
//   };

//   return user;
// };

export const onBoardUser = async () => {
  try {

    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No authenticated user found!" };
    }

    const { id, user_metadata } = user;
    const { name, email, avatar_url: avatarUrl } = user_metadata || {};

    const newUser = await database.profile.upsert({
      where: { supabaseUserId: id },
      update: { name, email, avatarUrl },
      create: { supabaseUserId: id, name, email, avatarUrl },
    });

    return {
      success: true,
      user: newUser,
      message: "User onBoarded successfully!",
    };
  } catch (error) {
    console.error("Error onBoarding user: ", error);
    return {
      success: false,
      error: "Failed to onBoard user",
    };
  }
};


export async function currentUserRole() {
  try {
    const user = await currentUser();
    if (!user) {
      return { success: false, error: "No authenticated user found!" };
    }

    const { id } = user;

    const userRole = await database.profile.findUnique({
      where: {
        supabaseUserId: id
      },
      select: {
        role: true
      }
    })

    return {
      success: true,
      role: userRole.role
    }

  } catch (error) {
    console.error("Error fetching user role: ", error);
    return {
      success: false,
      error: "Faild to fetch user role"
    }
  }
}


export async function getCurrentUserFromTable() {
  const user = await currentUser();

  const dbUser = await database.profile.findUnique({
    where: {
      supabaseUserId: user.id
    },
    select: {
      id: true
    }
  })

  return dbUser;

}