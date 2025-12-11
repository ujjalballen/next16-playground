import Link from "next/link";

export default function DashBoardMainLayout({ tab1, tab2 }) {
  return (
    <div>
      {/* <div className="flex gap-5">
        <div className="flex-2">{feed}</div>
        <div className="flex-1">{stats}</div>
      </div> */}

      <div className="mb-3">
        <Link href={"/dashboard-main/tab1"}>Tab 1</Link>
        <Link href={"/dashboard-main/tab2"}>Tab 2</Link>
      </div>

      <div>
        {tab1}
        {tab2}
      </div>
    </div>
  );
}
