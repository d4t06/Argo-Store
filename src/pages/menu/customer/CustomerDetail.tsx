import Frame from "@/components/ui/Frame";
import { useCustomerContext } from "@/stores/CustomerContext";
import { moneyFormat } from "@/utils/moneyFormat";
import Label from "@/components/ui/Label";
import { UserIcon } from "@heroicons/react/24/outline";
import CustomerReceipt from "@/components/CustomerReceipt";
import CustomerInvoice from "@/components/CustomerInvoice";
import Header from "@/components/Header";
import MenuBtn from "@/components/MenuBtn";
import NotFoundPage from "@/pages/NotFound";

export default function CustomerDetailPage() {
  const { currentCustomerData } = useCustomerContext();

  if (!currentCustomerData) return <NotFoundPage />;

  const { customer } = currentCustomerData;

  const classes = {
    label: "text-[#888] text-[16px]",
  };

  return (
    <>
      <Header title="Customer detail" />
      <MenuBtn />

      <div className="overflow-auto pb-20">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label
              className=""
              icon={<UserIcon className="w-6" />}
              title="User info"
            />
            <Frame className="space-y-2.5">
              <div className="">
                <p className={classes.label}>Customer:</p>
                <p className="text-3xl font-[500]">{customer.customer_name}</p>
              </div>

              <div className="">
                <p className={classes.label}>Phone number:</p>
                <p className="text-xl">{customer.phone_number}</p>
              </div>

              <div className="">
                <p className={classes.label}>Total buy:</p>
                <p className="text-xl text-xanh-500">
                  {moneyFormat(customer.total_buy)}
                </p>
              </div>

              <div className="">
                <p className={classes.label}>Total debt:</p>
                <p className="text-xl text-red-500">
                  {moneyFormat(customer.total_debt)}
                </p>
              </div>
            </Frame>
          </div>

          <CustomerReceipt />
          <CustomerInvoice />
        </div>
      </div>
    </>
  );
}

// export default function CustomerDetailScreen() {
//  return (
//    <ReceiptProvider>
//      <Content />
//    </ReceiptProvider>
//  );
// }
