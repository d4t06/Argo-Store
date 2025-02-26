import {
	customerCollectionRef,
	myAddDoc,
	myDeleteDoc,
	mySetDoc,
} from "@/firebase/firebaseService";
import { useCustomerContext } from "@/stores/CustomerContext";
import { useState } from "react";

export default function useCustomerAction() {
	const [isFetching, setIsFetching] = useState(false);
	const { customers, setCustomers } = useCustomerContext();

	type Add = {
		type: "add";
		data: CustomerSchema;
	};

	type Edit = {
		type: "edit";
		data: CustomerSchema;
		index: number;
	};

	type Delete = {
		type: "delete";
		index: number;
	};

	const action = async (props: Add | Edit | Delete) => {
		try {
			setIsFetching(true);

			switch (props.type) {
				case "add": {
					const id = await myAddDoc({
						collection: customerCollectionRef,
						data: props.data,
					});

					const newCustomer = { id, ...props.data };

					setCustomers((prev) => [newCustomer, ...prev]);
					setIsFetching(false);

					return newCustomer;
				}

				case "edit": {
					await mySetDoc({
						collection: "Customers",
						data: props.data,
						id: customers[props.index].id,
					});

					const newCustomers = [...customers];
					Object.assign(customers[props.index], props.data);

					setCustomers(newCustomers);
					setIsFetching(false);

					break;
				}

				case "delete": {
					await myDeleteDoc({
						collection: "Customers",
						id: customers[props.index].id,
					});

					const newCustomers = [...customers];

					newCustomers.splice(props.index, 1);
					setCustomers(newCustomers);
					setIsFetching(false);

					break;
				}
			}
		} catch (error) {
			setIsFetching(false);
			throw error;
		}
	};
	return { isFetching, action };
}
