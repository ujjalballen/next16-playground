import Link from "next/link";

export default function DashBoard() {
  return <div className="p-4">
    <h1 className="text-3xl text-amber-300">Dashboard</h1>
    <Link href={"/dashboard/reports"}>View Reports</Link>
    <Link href={"/profile"}>View Profile</Link>
  </div>;
}
