import Image from "next/image";

export default async function ExampleImage(){

    return(
        <div className="p-5 bg-black flex items-center justify-center h-screen">
            <Image 
            src={"./vercel.svg"}
            width={100}
            height={100}
            alt="Vercel LoGO"

            /> <br />
            <Image 
            src={"https://maybe.works/media/blogs/migrate-from-react-to-next-js/1100x600.jpg"}
            width={40}
            height={10}
            alt="Vercel logo two"

            />
        </div>
    )
}