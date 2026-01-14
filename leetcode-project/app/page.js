import { createSupabaseServerClient } from "@/lib/supabase/supabase-server";
import Image from "next/image";

export default async function HomePage() {
  // Example user state
  const supabase = await createSupabaseServerClient();

  const { data: user, error } = await supabase.auth.getUser();

  console.log("Data: ", user)


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        {/* User profile circle */}
        {
          user && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
                  <Image
                    src={user?.user_metadata?.picture}
                    alt={user?.user_metadata?.name || ""}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="hidden sm:block font-medium text-gray-700">
                  {user?.user_metadata?.name}
                </span>
              </div>

              {/* Right side example: placeholder for settings/logout */}
              <div className="flex items-center gap-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Logout
                </button>
              </div>
            </>
          )
        }
      </div>

      {/* Main content */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">
          This is your home dashboard. You can add rooms, chat, or manage your
          profile from here.
        </p>

        {/* Example cards or sections */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-lg text-gray-800">Room 1</h2>
            <p className="text-gray-500 text-sm mt-2">Active users: 5</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-lg text-gray-800">Room 2</h2>
            <p className="text-gray-500 text-sm mt-2">Active users: 3</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h2 className="font-semibold text-lg text-gray-800">Room 3</h2>
            <p className="text-gray-500 text-sm mt-2">Active users: 8</p>
          </div>
        </div>
      </div>
    </div>
  );
}
