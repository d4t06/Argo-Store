import ReceivesProvider from "@/stores/local/ReceivesContext";
import ReceivingCartProvider from "@/stores/local/ReceivingCartContext";
import { ReactNode } from "react";

export default function ReceiveLayout({ children }: { children: ReactNode }) {
  return (
    <ReceivesProvider>
      <ReceivingCartProvider>{children}</ReceivingCartProvider>
    </ReceivesProvider>
  );
}
