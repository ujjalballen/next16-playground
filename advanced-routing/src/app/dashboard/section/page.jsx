import Link from "next/link";

export default function SectionPage(){

    return(
        <div>
           <h1 className="text-3xl">Section</h1>
           <Link href={"/setting"}>Go to Setting</Link><br />
           <Link href={"/admin"}>Go to Admin</Link>

        </div>
    )
}