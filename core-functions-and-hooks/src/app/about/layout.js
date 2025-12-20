import NavigationBar from "../../../components/navigation";

export default function Aboutlayout({ children }) {
  return (
    <div>
      <NavigationBar />
      <main>{children}</main>
    </div>
  );
}
