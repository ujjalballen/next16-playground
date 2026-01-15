"use server";

import { database } from "@/lib/db";
import { createSupabaseServerClient } from "@/lib/supabase/supabase-server";

export const onBoardUser = async () => {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

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

