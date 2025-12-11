export default function LessonPage() {
  return (
    <div className="flex gap-3">
      <div className="border-2 border-amber-400 p-5">
        <h1 className="text-2xl border-b pb-1">Intercept Route</h1>
        <ul className="flex gap-1 pt-3">
          <li>Same Level:</li>
          <li>(.)folderName</li>
        </ul>
        <ul className="flex gap-1">
          <li>One Level Up:</li>
          <li>(..)folderName</li>
        </ul>
        <ul className="flex gap-1">
          <li>Two Level Up:</li>
          <li>(..)(..)folderName</li>
        </ul>
        <ul className="flex gap-1">
          <li>Root Level:</li>
          <li>(...)folderName</li>
        </ul>
      </div>

      <div className="border-2 border-amber-400 p-5">
        <h1 className="text-2xl border-b pb-1">Parallel Routes and Slots</h1>
        <ul>
          <li>For Parallel routes we need to define the components using slot</li>
          <li>and then we can get them inside the *layout*, so that we can render</li>
        </ul>
      </div>
    </div>
  );
}
