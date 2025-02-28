import { ReactNode } from "react";
import InvoiceProvider from "@/stores/local/InvoicesContext";
import MenuBtn from "@/components/MenuBtn";

export default function InvoiceLayout({ children }: { children: ReactNode }) {
	return (
		<InvoiceProvider>
			{children}
			<MenuBtn />
		</InvoiceProvider>
	);
}
