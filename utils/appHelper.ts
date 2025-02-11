export const sleep = async (delay: number) =>
	new Promise((rs) => setTimeout(rs, delay));

export const initProductObject = (data: Partial<ProductList>) => {
	const newProduct: ProductList = {
		image: "",
		title: "",
		price: 0,
		description: "",
		debt_price: 0,
		barcode: "",
		id: 0,

		...data,
	};

	return newProduct;
};
