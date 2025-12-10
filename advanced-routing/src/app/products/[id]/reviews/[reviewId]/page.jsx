export default async function ReviewDynamic({ params }) {
  const allParams = await params;

  console.log(allParams)

  return <div>Review Dynamic Page ID is {allParams.id} and review ID is {allParams.reviewId} </div>;
}
