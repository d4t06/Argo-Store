import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-screen w-screen bg-[#f0f4f9]">
      <div className="flex h-full">{children}</div>
    </div>
  );
}
