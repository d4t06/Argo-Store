import { useCustomerContext } from "@/stores/CustomerContext";
import { useEffect } from "react";
import Loading from "@/components/ui/Loading";
import NotFound from "@/components/ui/NoResult";
import Label from "@/components/ui/Label";
import Frame from "@/components/ui/Frame";
import useGetCustomerReceipt from "@/hooks/useGetCustomerReceipt";
import { Button } from "./ui";
import { DocumentTextIcon, PlusIcon } from "@heroicons/react/24/outline";
import { convertFirestoreTimestampToString } from "@/utils/appHelper";
import { moneyFormat } from "@/utils/moneyFormat";

export default function CustomerReceipt() {
  const { currentCustomerData } = useCustomerContext();
  const { getCustomerReceipts, receipts, isFetching } = useGetCustomerReceipt();

  useEffect(() => {
    if (!currentCustomerData) return;

    getCustomerReceipts(currentCustomerData.customer.id);
  }, []);

  return (
    <>
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <Label
            className=""
            icon={<DocumentTextIcon className="w-6" />}
            title="Receipts"
          />

          {!!currentCustomerData?.customer?.total_debt && (
            <Button
              href={`/menu/customers/${currentCustomerData.customer.id}/create-receipt`}
            >
              <PlusIcon className="w-6" />
              <span>Add receipt</span>
            </Button>
          )}
        </div>

        <Frame className="space-y-1.5">
          {isFetching ? (
            <Loading />
          ) : (
            <>
              {receipts.length ? (
                receipts.map((r, i) => (
                  <div key={i} className="pb-1.5 border-b border-black/10 last:border-none">
                    <p className="text-[#333]">
                      {convertFirestoreTimestampToString(r.created_at)}
                    </p>
                    <p className="text-xl text-xanh-500">
                      {moneyFormat(r.price)}
                    </p>
                  </div>
                ))
              ) : (
                <NotFound />
              )}
            </>
          )}
        </Frame>
      </div>
    </>
  );
}
