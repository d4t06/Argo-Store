import Loading from "@/components/ui/Loading";
import NotFound from "@/components/ui/NoResult";
import { convertFirestoreTimestampToString } from "@/utils/appHelper";
import { moneyFormat } from "@/utils/moneyFormat";
import { useEffect } from "react";
import Frame from "@/components/ui/Frame";
import useGetInvoice from "@/hooks/useGetInvoices";
import { useNavigate } from "react-router-dom";

export default function MenuInvoicePage() {
  const {
    isFetching,
    invoices,
    setIsFetching,
    setCurrentInvoiceId,
    getInvoices,
    shouldFetchInvoice,
  } = useGetInvoice();

  const navigator = useNavigate();

  const handleNavigate = (invoice: Invoice) => {
    setCurrentInvoiceId(invoice.id);
    navigator(`/menu/invoices/${invoice.id}`);
  };

  useEffect(() => {
    if (shouldFetchInvoice.current) {
      shouldFetchInvoice.current = false;
      console.log("get invoices");
      getInvoices();
    } else setIsFetching(false);
  }, []);

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
        <>
          {invoices.length ? (
            <div className="space-y-2 overflow-auto">
              {invoices.map((invoice, i) => (
                <Frame
                  onClick={() => handleNavigate(invoice)}
                  key={i}
                  className="mb-2"
                >
                  <p className="text-[#333]">
                    {convertFirestoreTimestampToString(invoice.created_at)}
                  </p>
                  <p className="text-xl">{invoice.customer_name}</p>
                  <p
                    className={`text-xl ${
                      invoice.payment === "tien-mat"
                        ? "text-xanh-500"
                        : "text-red-500"
                    } `}
                  >
                    {moneyFormat(invoice.total_price)}
                  </p>
                </Frame>
              ))}
            </div>
          ) : (
            <NotFound className="flex-1" />
          )}
        </>
      )}
    </>
  );
}
