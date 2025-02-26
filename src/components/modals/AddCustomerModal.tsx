import { Text, TextInput, View } from "react-native";
import { ModalHeader } from "../ui/Modal";
import { useEffect, useState } from "react";
import MyButton from "../MyButton";
import useCustomerAction from "@/hooks/useCustomerAction";
import { initCustomerObject } from "@/utils/appHelper";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
	closeModal: () => void;
	afterSubmit?: (c: Customer) => void;
};

type Edit = {
	type: "edit";
	customer: Customer;
	index: number;
};

type Add = {
	type: "add";
	userEmail: string;
};

const initCustomer = (props: Add | Edit) => {
	if (props.type === "edit") {
		const { id, ...rest } = props.customer;
		return initCustomerObject(rest);
	}

	return initCustomerObject({
		user_email: props.userEmail,
	});
};

const PHONE_REGEX = /(0[3|5|7|8|9])+([0-9]{8})\b/g;

export default function AddCustomerModal({
	closeModal,
	afterSubmit,
	...props
}: (Add | Edit) & Props) {
	const [customer, setCustomer] = useState(initCustomer(props));
	const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

	const { action, isFetching } = useCustomerAction();

	const ableToSubmit = customer.customer_name && isValidPhoneNumber;

	const handleInput = (field: keyof typeof customer, value: string) => {
		setCustomer({ ...customer, [field]: value.trim() });
	};

	const handleSubmit = async () => {
		try {
			switch (props.type) {
				case "add":
					const newCustomer = await action({
						type: "add",
						data: customer,
					});

					if (newCustomer && afterSubmit) afterSubmit(newCustomer);
					break;
				case "edit":
					await action({
						type: "edit",
						data: customer,
						index: props.index,
					});
					break;
			}
		} catch (error) {
			console.log(error);
		} finally {
			closeModal();
		}
	};

	const classes = {
		inputGroup: "gap-1",
		input: "p-2 bg-[#f1f1f1] border border-black/20 rounded-lg",
		label: "text-[#3f3f3f] text-lg",
	};

	useEffect(() => {
		if (customer.phone_number) {
			const result = PHONE_REGEX.test(customer.phone_number);
			setIsValidPhoneNumber(result);
		} else setIsValidPhoneNumber(true);
	}, [customer.phone_number]);

	const title =
		props.type === "edit" ? `Edit '${props.customer.customer_name}'` : `Add customer`;

	return (
		<>
			<ModalHeader close={closeModal} title={title} />

			<View className="gap-3">
				<View className={classes.inputGroup}>
					<Text className={classes.label}>Customer name:</Text>
					<TextInput
						value={customer.customer_name}
						onChangeText={(v) => handleInput("customer_name", v)}
						placeholder="Enter name..."
						className={classes.input}
						placeholderTextColor={"#ccc"}
					/>
				</View>

				<View className={classes.inputGroup}>
					<Text
						className={`${classes.label} ${!isValidPhoneNumber ? "text-red-500" : ""}`}
					>
						Phone number:
					</Text>
					<TextInput
						value={customer.phone_number}
						onChangeText={(v) => handleInput("phone_number", v)}
						className={classes.input}
						placeholderTextColor={"#ccc"}
					/>
				</View>

				<View className={classes.inputGroup}>
					<Text className={classes.label}>Address:</Text>
					<TextInput
						value={customer.address}
						onChangeText={(v) => handleInput("address", v)}
						className={classes.input}
						placeholderTextColor={"#ccc"}
					/>
				</View>
			</View>

			<View className="items-center mt-5">
				<MyButton
					disabled={!ableToSubmit}
					loading={isFetching}
					onPress={() => ableToSubmit && handleSubmit()}
				>
					<Ionicons name="add-outline" size={24} color={"white"} />
					<Text className="text-white">Ok</Text>
				</MyButton>
			</View>
		</>
	);
}
