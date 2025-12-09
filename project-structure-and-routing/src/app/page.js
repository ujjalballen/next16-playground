export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-san">
      <div className="flex items-center justify-center pt-4">
        <div className="max-w-xl text-center border-2 p-4">
          <h1 className="text-3xl pb-1.5">Welcome to Next.js</h1>
          <p className="font-sm pb-1.5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit impedit ab dignissimos corporis accusantium.
            Perspiciatis, id qui dolorem temporibus ratione dolores veritatis
            velit magnam quo incidunt quidem reiciendis alias, ipsum saepe
            aliquam possimus eligendi magni quisquam iure porro laborum
            accusantium!
          </p>
          <div className="flex items-center justify-center gap-1.5">
            <button className="bg-amber-500 px-4 py-2 border-2 rounded-2xl cursor-pointer">Learn More</button>
            <button className="bg-amber-300 px-4 py-2 border-2 rounded-2xl cursor-pointer">See Doc</button>
          </div>
        </div>
      </div>
    </div>
  );
}
