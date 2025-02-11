import { initProductObject } from "@/utils/appHelper";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { TouchableOpacity } from "react-native";
import { CheckIcon } from "react-native-heroicons/outline";
import Empty from "./ui/Empty";

type AddProduct = {
	variant: "add";
};

type EditProduct = {
	variant: "edit";
	product: ProductList;
};

type Props = AddProduct | EditProduct;

const runInitProductData = (props: Props) => {
	switch (props.variant) {
		case "add":
			return initProductObject({});
		case "edit":
			const { product } = props;
			return initProductObject(props.product);
	}
};

export default function AddProductForm(props: Props) {
	const [productData, setProductData] = useState<ProductList>(() =>
		runInitProductData(props),
	);

	const handleInput = (field: keyof ProductList, value: string) => {
		switch (field) {
			case "price":
			case "debt_price":
				if (!isNaN(+value))
					return setProductData({ ...productData, [field]: +value });
				else if (!value) {
					return setProductData({ ...productData, [field]: null });
				} else return;
		}

		setProductData({ ...productData, [field]: value });
	};

	const classes = {
		inputGroup: "flex-row items-center bg-white ml-2",
		input: "ml-2 flex-grow",
		label: "w-[100px]",
	};

	return (
		<View className="flex-1">
			<ScrollView>
				<View className="items-center">
					<View className="w-[160px] mt-5">
						<Empty>
							{productData.image && (
								<Image
									source={{ uri: productData.image }}
									className="absolute inset-0"
								/>
							)}
						</Empty>
					</View>
				</View>

				<View className="mt-5">
					<View className={classes.inputGroup}>
						<ThemedText className={classes.label}>Name:</ThemedText>
						<TextInput
							multiline
							value={productData.title}
							onChangeText={(v) => handleInput("title", v)}
							placeholder="Enter name..."
							className={classes.input}
						/>
					</View>

					<View className={classes.inputGroup}>
						<ThemedText className={classes.label}>Price:</ThemedText>
						<TextInput
							keyboardType="numeric"
							placeholder="..."
							className={classes.input}
							value={productData.price ? productData.price + "" : ""}
							onChangeText={(v) => handleInput("price", v)}
						/>
					</View>

					<View className={classes.inputGroup}>
						<ThemedText className={classes.label}>Debt price:</ThemedText>
						<TextInput
							keyboardType="numeric"
							placeholder="..."
							value={productData.debt_price ? productData.debt_price + "" : ""}
							onChangeText={(v) => handleInput("debt_price", v)}
							className={classes.input}
						/>
					</View>

					<View className={classes.inputGroup}>
						<ThemedText className={classes.label}>Quantity:</ThemedText>
						<TextInput
							keyboardType="numeric"
							placeholder="..."
							className={classes.input}
							// onChangeText={(v) => handleInput("", v)}
							// className={classes.input}
						/>
					</View>
				</View>

				<View className="items-center mt-5">
					<TouchableOpacity
						activeOpacity={0.6}
						className="flex-row items-center bg-[#5e9387] p-3 rounded-full"
					>
						<CheckIcon size={24} color={"white"} />
						<ThemedText lightColor="white" className="ml-2">
							{props.variant === "add" ? "Save" : "Save change"}
						</ThemedText>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}
