import { useAuth } from "@/stores/AuthContext";
import { useCartContext } from "@/stores/CartContext";
import { useCheckoutContext } from "@/stores/CheckoutContext";
import { fixedNumber } from "@/utils/moneyFormat";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function useCheckoutOrder() {
	const { user } = useAuth();
	const { customer, ableToSubmit, payMethod, setInvoice } =
		useCheckoutContext();
	const { cartItems } = useCartContext();

	const navigater = useNavigate();

	const checkout = async () => {
		if (!ableToSubmit || !customer || !user) return;

		const invoiceItems: InvoiceItem[] = [];

		cartItems.forEach((p) => {
			const filteredUnit = p.units.filter((u) => u.quantity > 0);
			const sortedUnit = filteredUnit.sort((a, b) =>
				a.conversion_quantity > b.conversion_quantity ? 1 : -1,
			);

			let finalPricePer1: number = sortedUnit[0].price;

			if (payMethod === "no") {
				finalPricePer1 = p.debt_price;
			} else if (filteredUnit.length > 1) {
				finalPricePer1 =
					sortedUnit[sortedUnit.length - 1].price /
					sortedUnit[sortedUnit.length - 1].conversion_quantity;
			}

			const invoiceItem: InvoiceItem = {
				product_name: p.product_name,
				product_image_url: p.image_url,
				product_id: p.id,
				unit_name: p.units[0].unit_name,
				quantity: p.total_quantity,
				price: fixedNumber(finalPricePer1),
				stock_price: p.stock_price,
			};

			invoiceItems.push(invoiceItem);
		});

		const totalPrice = invoiceItems.reduce(
			(prev, cur) => prev + cur.price * cur.quantity,
			0,
		);
		const totalStockPrice = invoiceItems.reduce(
			(prev, cur) => prev + cur.stock_price * cur.quantity,
			0,
		);

		const invoice: InvoiceSchema = {
			customer_id: customer.id,
			customer_name: customer.customer_name,
			user_email: user.email,
			items: invoiceItems,
			payment: payMethod,
			total_price: +totalPrice.toFixed(1),
			revenue: +(totalPrice - totalStockPrice).toFixed(1),
			created_at: serverTimestamp(),
		};

		setInvoice(invoice);

		navigater("/checkout");
	};
	return { checkout };
}
