export default async function CatchAllSegMent({params}){

    const allSlug = await params
    console.log(allSlug)

    return(
        <div>
            CatchAllSegMen
        </div>
    )
}