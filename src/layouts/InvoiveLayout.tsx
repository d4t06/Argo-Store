import { ReactNode } from "react";
import DefaultLayout from "./DefaultLayout";
import InvoiceProvider from "@/stores/local/InvoicesContext";

export default function InvoiceLayout({ children }: { children: ReactNode }) {
	return (
		<DefaultLayout>
			<InvoiceProvider>{children}</InvoiceProvider>
		</DefaultLayout>
	);
}
