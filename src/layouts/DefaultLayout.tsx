import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return <div className="container min-h-screen">{children}</div>;
}
