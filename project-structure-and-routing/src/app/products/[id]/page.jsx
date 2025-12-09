export default async function ProductDetailsPage({params}){

    const {id} = await params;

    return(
        <div>
            Product Details Page id: {id}
        </div>
    )
}