import { createUser } from "../actions";

export default function UserForm(){

    // async function createUser(formData) {
    //     "use server"
    //     const name = formData.get("name");

    //     console.log("Creating User: ", name)
    // }

    return(
        <form action={createUser}>
           <input type="text" name="name" id="" className="border border-amber-300" /><br />
           <button type="submit" className="border border-amber-700 cursor-pointer">Create</button>
        </form>
    )
}