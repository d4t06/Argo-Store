import CustomerItem from "@/components/CustomerItem";
import CustomerSearchBar from "@/components/CustomerSearchBar.";
import AddCustomerModal from "@/components/modals/AddCustomerModal";
import Loading from "@/components/ui/Loading";
import useGetCustomer from "@/hooks/useGetCustomer";
import useSearchCustomer from "@/hooks/useSearchCustomer";
import { useCheckoutContext } from "@/stores/CheckoutContext";
import { useEffect, useRef } from "react";
import Modal, { ModalRef } from "../ui/Modal";
import { Button, NoResult } from "../ui";
import { PlusIcon } from "@heroicons/react/16/solid";

type Props = {
  closeModal: () => void;
};

// This component use in checkout page
export default function CustomerListModal({ closeModal }: Props) {
  const { setCustomer } = useCheckoutContext();

  const modalRef = useRef<ModalRef>(null);
  const closeAddCustomerModal = () => modalRef.current?.close();

  const { _customers, ...rest } = useSearchCustomer();
  const { shouldFetchCustomer, api, isFetching, setIsFetching, user } =
    useGetCustomer();

  const handleChooseCustomer = (c: Customer) => {
    setCustomer(c);
    closeModal();
  };

  const afterSubmit = (c: Customer) => {
    handleChooseCustomer(c);
    closeAddCustomerModal();
  };

  useEffect(() => {
    if (shouldFetchCustomer.current) {
      shouldFetchCustomer.current = false;
      api();
    } else setIsFetching(false);
  }, []);

  if (!user) return;

  return (
    <>
      <CustomerSearchBar {...rest} />

      <div className="h-[40vh] mt-3 space-y-1.5 overflow-auto">
        {isFetching && <Loading />}

        {!isFetching && (
          <>
            {_customers.length ? (
              _customers.map((c, i) => (
                <CustomerItem
                  onClick={() => handleChooseCustomer(c)}
                  key={i}
                  customer={c}
                />
              ))
            ) : (
              <NoResult />
            )}
          </>
        )}
      </div>

      <p className="text-center">
        <Button onClick={() => modalRef.current?.open()}>
          <PlusIcon className="w-6" />
          <span>Add new customer</span>
        </Button>
      </p>

      <Modal ref={modalRef}>
        <AddCustomerModal
          type="add"
          userEmail={user.email}
          afterSubmit={afterSubmit}
          closeModal={closeAddCustomerModal}
          customerName={rest.value}
        />
      </Modal>
    </>
  );
}
