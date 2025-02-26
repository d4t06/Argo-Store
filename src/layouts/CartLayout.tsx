import { ReactNode } from "react";

export default function CartLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0">
      <div className="container relative py-3 flex flex-col h-full max-w-[800px]">
        {children}
      </div>
    </div>
  );
}
