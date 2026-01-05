import { createPost, seedDB } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Home() {
  // await seedDB()
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">ORM & Prisma in Next.js</h1>
          <p></p>
        </header>
        <main>
          <Card className={"mb-6"}>
            <CardHeader>
              <CardTitle>Create </CardTitle>
            </CardHeader>
            <CardContent>
              <form 
              action={createPost}
              className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter title"
                  />

                </div>
                <div>
                  <Label htmlFor="description">Title *</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Enter description"
                  />

                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    variant="outline"

                  >
                    Crate Post
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>This app demostrates CRUD operations with modern React patterns</p>
        </footer>
      </div>
    </div>
  );
}
