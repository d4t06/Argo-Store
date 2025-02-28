import { Outlet } from "react-router-dom";

export default function GlobalLayout() {
  return (
    <div className="fixed inset-0">
      <div className="container relative py-3 flex flex-col h-full max-w-[800px]">
        <Outlet />
      </div>
    </div>
  );
}
