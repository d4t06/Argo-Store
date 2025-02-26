import Frame from "@/components/ui/Frame";
import { useCheckoutContext } from "@/stores/CheckoutContext";
import Label from "@/components/ui/Label";
import { useCartContext } from "@/stores/CartContext";
import { useEffect } from "react";
import { Button, NoResult } from "@/components/ui";
import {
	DocumentCurrencyDollarIcon,
	ShoppingBagIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import useCheckoutOrder from "@/hooks/useCheckoutOrder";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import OrderCartItem from "@/components/CartItem";
import OrderCustomerSelect from "@/components/OrderCusomterSelect";

export default function CartPage() {
	const { cartItems } = useCartContext();
	const { payMethod, setPayMethod, setAbleToSubmit, ableToSubmit, customer } =
		useCheckoutContext();

	const { checkout } = useCheckoutOrder();

	useEffect(() => {
		const validCartItem = !cartItems.find(
			(i) => i.stock < i.total_quantity || i.total <= 0,
		);

		setAbleToSubmit(validCartItem && !!customer);
	}, [cartItems]);

	return (
		<>
			<div className="space-y-4 flex-1 pb-[100px] overflow-auto">
				<div className="space-y-1">
					<Label title="Products" icon={<ShoppingBagIcon className="w-6" />} />
					<Frame className="space-y-4">
						{cartItems.length ? (
							cartItems.map((c, i) => (
								<OrderCartItem index={i} key={i} cartItem={c} />
							))
						) : (
							<NoResult />
						)}
					</Frame>
				</div>

				<div className="space-y-1">
					<Label title="Customer" icon={<UserIcon className="w-7" />} />

					<OrderCustomerSelect />
				</div>

				<div className="space-y-1">
					<Label
						title="Payment"
						icon={<DocumentCurrencyDollarIcon className="w-6 text-xanh-500" />}
					/>

					<Frame className="space-x-2">
						<Button
							color={"second"}
							active={payMethod === "no"}
							onClick={() => setPayMethod("no")}
						>
							No
						</Button>

						<Button
							color={"second"}
							active={payMethod === "tien-mat"}
							onClick={() => setPayMethod("tien-mat")}
						>
							Tien mat
						</Button>
					</Frame>
				</div>
			</div>

			<div className="fixed bg-white bottom-0 left-0 right-0 border-t border-black/10 py-2 md:p-[16px]">
				<div className="container max-w-[800px] flex justify-between">
					<Button href="/">
						<ChevronLeftIcon className="w-6" />
						<span>Home</span>
					</Button>

					<Button disabled={!ableToSubmit} onClick={checkout}>
						<span>Checkout</span>
						<ChevronRightIcon className="w-6" />
					</Button>
				</div>
			</div>
		</>
	);
}
