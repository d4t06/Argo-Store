import { ModalRef } from "@/components/ui/Modal";
import { useCheckoutContext } from "@/stores/CheckoutContext";
import { useRef } from "react";
import CustomerItem from "@/components/CustomerItem";
import { Frame, Modal } from "./ui";
import { PlusIcon } from "@heroicons/react/16/solid";
import CustomerListModal from "./modals/CustomerList";

export default function OrderCustomerSelect() {
	const { customer } = useCheckoutContext();

	const modalRef = useRef<ModalRef>(null);

	const closeModal = () => modalRef.current?.close();

	return (
		<>
			{!customer && (
				<Frame onClick={() => modalRef.current?.open()}>
					<p className="text-center w-full">
						<PlusIcon className="w-6" />
					</p>
				</Frame>
			)}
			{customer && <CustomerItem onClick={() => modalRef.current?.open()} customer={customer} />}

			<Modal ref={modalRef}>
				<CustomerListModal closeModal={closeModal} />
			</Modal>
		</>
	);
}
