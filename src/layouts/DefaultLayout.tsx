import MenuBtn from "@/components/MenuBtn";
import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0">
      <div className="container relative py-3 flex flex-col h-full max-w-[800px]">
        {children}
        <MenuBtn />
      </div>
    </div>
  );
}
