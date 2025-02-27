import { useCartContext } from "@/stores/CartContext";
import { MinusIcon, PlusIcon } from "@heroicons/react/16/solid";

type Props = {
	cartItemUnit: CartItemUnit;
	index: number;
	productIndex: number;
};

export default function QuantityItem({
	cartItemUnit,
	index,
	productIndex,
}: Props) {
	const { action, updateUnit } = useCartContext();

	const classes = {
		quantityBox:
			"flex flex-shrink-0 ml-auto border-[#e1e1e1] border justify-between overflow-hidden items-center rounded-[99px] bg-[#fff]",
		button: "border-[#e1e1e1] p-1 justify-center",
	};

	return (
		<div className="flex gap-2 items-center">
			<p className="text-[#333]">
				{cartItemUnit.unit_name} (x{cartItemUnit.conversion_quantity}):
			</p>
			<div className={classes.quantityBox}>
				<button
					onClick={() =>
						action({
							type: "decrease",
							productIndex: productIndex,
							unitIndex: index,
						})
					}
					className={`${classes.button} border-r `}
				>
					<MinusIcon className="w-6" />
				</button>
				<input
					value={cartItemUnit.quantity.toString()}
					onChange={(e) =>
						!isNaN(+e.target.value)
							? updateUnit({
									productIndex,
									unitIndex: index,
									unit: { quantity: +e.target.value },
								})
							: {}
					}
					className="outline-none w-[40px] text-center text-[#3f3f3f] font-bold"
				/>

				<button
					onClick={() =>
						action({
							type: "increase",
							productIndex: productIndex,
							unitIndex: index,
						})
					}
					className={`${classes.button} border-l`}
				>
					<PlusIcon className="w-6" />
				</button>
			</div>
		</div>
	);
}
