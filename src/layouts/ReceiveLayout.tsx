import ReceivesProvider from "@/stores/local/ReceivesContext";
import ReceivingCartProvider from "@/stores/local/ReceivingCartContext";
import { ReactNode } from "react";
import CartLayout from "./CartLayout";

export default function ReceiveLayout({ children }: { children: ReactNode }) {
  return (
    <CartLayout>
      <ReceivesProvider>
        <ReceivingCartProvider>{children}</ReceivingCartProvider>
      </ReceivesProvider>
    </CartLayout>
  );
}
