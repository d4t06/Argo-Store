import CartItemQuantity from "./CartItemQuantity";
import { useEffect, useState } from "react";
import { useCheckoutContext } from "@/stores/CheckoutContext";
import { useCartContext } from "@/stores/CartContext";
import { moneyFormat } from "@/utils/moneyFormat";
import { Button } from "./ui";
import { TrashIcon } from "@heroicons/react/24/outline";
import simonEmpty from "@/assets/images/simon_empty.png";

type Props = {
	cartItem: CartItem;
	index: number;
};

export default function OrderCartItem({ cartItem, index }: Props) {
	const { updateCartItem, remove } = useCartContext();
	const { payMethod } = useCheckoutContext();

	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const totalPrice = cartItem.units.reduce(
			(prev, cur) =>
				prev +
				cur.quantity *
					(payMethod === "tien-mat"
						? cur.price
						: cartItem.debt_price * cur.conversion_quantity),
			0,
		);

		const totalQuantity = cartItem.units.reduce(
			(prev, c) => prev + c.quantity * c.conversion_quantity,
			0,
		);

		if (totalQuantity > cartItem.stock) {
			setErrorMessage("Out of stock");
		} else setErrorMessage("");

		updateCartItem({
			index,
			product: { total: totalPrice, total_quantity: totalQuantity },
		});
	}, [cartItem.units, payMethod]);

	return (
		<div className="flex">
			<img
				style={{ height: 70, width: 70, marginBottom: "auto" }}
				src={cartItem.image_url ? cartItem.image_url : simonEmpty}
			/>

			<div className="pl-2 flex-grow">
				<div className="flex items-center justify-between flex-grow">
					<p className={`text-lg`}>
						{cartItem.product_name}
						<p className="text-sm text-gray-500">(stock: {cartItem.stock})</p>
					</p>

					<Button
						onClick={() => remove(index)}
						size={"clear"}
						className="ml-auto p-2"
					>
						<TrashIcon className="w-6" />
					</Button>
				</div>

				{errorMessage && (
					<p className="text-[14px] mt-1 text-white p-2 bg-red-500 rounded-md">
						{errorMessage}
					</p>
				)}

				<div className="mt-3 space-y-2">
					{cartItem.units.map((u, i) => (
						<CartItemQuantity
							index={i}
							productIndex={index}
							key={i}
							cartItemUnit={u}
						/>
					))}
				</div>

				<div className="mt-3 ml-auto text-right">
					<p className=" text-[#333]">
						Total:
						{cartItem.total_quantity}
					</p>
					<p className="">
						Price:
						<span className="text-red-500"> {moneyFormat(cartItem.total)}</span>
					</p>
				</div>
			</div>
		</div>
	);
}
