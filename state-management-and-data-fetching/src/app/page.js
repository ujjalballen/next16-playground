import UsersList from "@/components/users-list";

export default async function Home() {
  return (
    <main className="max-h-screen py-12 px-">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            State management and Data fetching
          </h1>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <UsersList/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
