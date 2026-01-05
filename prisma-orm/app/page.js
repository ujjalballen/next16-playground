
export default async function Home() {

  await connectDB();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">ORM & Prisma in Next.js</h1>
          <p></p>
        </header>
        <main>

        </main>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>This app demostrates CRUD operations with modern React patterns</p>
        </footer>
      </div>
    </div>
  );
}
