import Sidebar from "./Sidebar";
export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-7">
        <h1>Home</h1>
      </div>
    </div>
  );
}
