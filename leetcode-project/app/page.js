import { Header } from "@/components/Header";
import { createSupabaseServerClient } from "@/lib/supabase/supabase-server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function HomePage() {
  // Example user state
  const supabase = await createSupabaseServerClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  console.log("Data: ", user)


  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user?.user_metadata} />
    </div>
  );
}
