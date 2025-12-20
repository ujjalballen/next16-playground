import { redirect } from "next/navigation";

export default async function Accesspage() {
    const isLogin = false;

    if(!isLogin){
        return redirect("/login")
    }
  return <div>
    This is Access Page...
  </div>;
}
