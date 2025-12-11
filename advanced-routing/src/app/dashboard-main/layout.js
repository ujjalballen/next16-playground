export default function DashBoardMainLayout({ feed, stats }) {
  return (
    <div className="flex gap-5">
      <div className="flex-2">{feed}</div>
      <div className="flex-1">{stats}</div>
    </div>
  );
}
