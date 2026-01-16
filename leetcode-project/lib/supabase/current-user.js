import { createSupabaseServerClient } from "./supabase-server";

export const currentUser = async () => {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    return null
  };

  return user;
};