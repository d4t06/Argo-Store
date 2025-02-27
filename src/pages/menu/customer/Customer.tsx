import NotFound from "@/components/ui/NoResult";
import { useEffect } from "react";
import useGetCustomer from "@/hooks/useGetCustomer";
import Loading from "@/components/ui/Loading";
import CustomerSearchBar from "@/components/CustomerSearchBar.";
import useSearchCustomer from "@/hooks/useSearchCustomer";
import { Link, useNavigate } from "react-router-dom";
import { moneyFormat } from "@/utils/moneyFormat";
import { Frame } from "@/components/ui";

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
      <CustomerSearchBar {...rest} />
      {isFetching ? (
        <Loading />
      ) : (
        <>
          {_customers.length ? (
            <div className="mt-3 space-y-2.5">
              {_customers.map((c, i) => (
                <Frame className="flex" key={i} onClick={() => handleNavigate(c, i)}>
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
