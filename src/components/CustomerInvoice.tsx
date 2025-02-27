import { useCustomerContext } from "@/stores/CustomerContext";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
import NotFound from "@/components/ui/NoResult";
import Label from "@/components/ui/Label";
import Frame from "@/components/ui/Frame";
import useGetCustomerInvoice from "@/hooks/useGetCustomerInvoice";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import CustomerInvoiceItem from "./CustomerInvoiceItem";

export default function CustomerInvoice() {
  const { currentCustomerData } = useCustomerContext();

  const { getCustomerInvoices, invoices, isFetching } = useGetCustomerInvoice();

  useEffect(() => {
    if (!currentCustomerData) return;

    getCustomerInvoices(currentCustomerData.customer.id);
  }, []);

  return (
    <div className="space-y-1.5">
      <Label
        className=""
        icon={<DocumentTextIcon className="w-6" />}
        title="Invoices"
      />

      <Frame className="space-y-1.5">
        {isFetching ? (
          <Loading />
        ) : (
          <>
            {invoices.length ? (
              invoices.map((invoice, i) => (
                <CustomerInvoiceItem key={i} invoice={invoice} />
              ))
            ) : (
              <NotFound />
            )}
          </>
        )}
      </Frame>
    </div>
  );
}
