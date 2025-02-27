import NotFound from "@/components/ui/NoResult";
import { useEffect } from "react";
import useGetCustomer from "@/hooks/useGetCustomer";
import Loading from "@/components/ui/Loading";
import CustomerSearchBar from "@/components/CustomerSearchBar.";
import useSearchCustomer from "@/hooks/useSearchCustomer";
import { useNavigate } from "react-router-dom";
import { moneyFormat } from "@/utils/moneyFormat";
import { Frame } from "@/components/ui";
import Header from "@/components/Header";

export default function MenuCustomerPage() {
  const { api, isFetching, setIsFetching, shouldFetchCustomer } =
    useGetCustomer();

  const { _customers, setCurrentCustomerData, ...rest } = useSearchCustomer();

  const navigate = useNavigate();

  const handleNavigate = (customer: Customer, index: number) => {
    setCurrentCustomerData({ customer, index });
    navigate(`/menu/customer/${customer.id}`);
  };

  useEffect(() => {
    if (shouldFetchCustomer.current) {
      shouldFetchCustomer.current = false;
      console.log("get customers");
      api();
    } else setIsFetching(false);
  }, []);

  return (
    <>
      <Header title="Customer" />

      <CustomerSearchBar {...rest} />
      {isFetching ? (
        <Loading />
      ) : (
        <>
          {_customers.length ? (
            <div className="flex-grow mt-3 space-y-2.5 pb-20 overflow-auto">
              {_customers.map((c, i) => (
                <Frame
                  className="flex"
                  key={i}
                  onClick={() => handleNavigate(c, i)}
                >
                  <p className="text-2xl font-500">{c.customer_name}</p>

                  <div className="space-y-1 text-right ml-auto text-[#888]">
                    <p>
                      Total buy: <br />
                      <span className="text-lg text-green-500">
                        {moneyFormat(c.total_buy)}
                      </span>
                    </p>

                    <p>
                      Total debt: <br />
                      <span className="text-lg text-red-500">
                        {moneyFormat(c.total_debt)}
                      </span>
                    </p>
                  </div>
                </Frame>
              ))}
            </div>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  );
}
