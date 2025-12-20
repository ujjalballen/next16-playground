import { notFound } from "next/navigation";

export default async function ReviewDetails({ params }) {
  const { id } = await params;

  if(parseInt(id) > 5){
    return notFound()
  }


  return <div>Review Id: {id}</div>;
}
