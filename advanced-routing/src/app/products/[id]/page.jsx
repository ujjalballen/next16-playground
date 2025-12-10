export default async function DynamicProduct({params}){

    const {id} = await params;
    return(
        <div>
            Product Page Id: {id}
        </div>
    )
}