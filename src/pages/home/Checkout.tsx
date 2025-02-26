import CheckoutInvoiceItem from "@/components/CheckoutInvoiceItem";
import { Frame, Label, Button } from "@/components/ui";
import NotFound from "@/components/ui/NoResult";
import usePlaceOrder from "@/hooks/usePlaceOrder";
import { useCheckoutContext } from "@/stores/CheckoutContext";
import { moneyFormat } from "@/utils/moneyFormat";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { DocumentTextIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

export default function CheckoutPage() {
	const { invoice, customer, totalInvoicePrice } = useCheckoutContext();

	const { placeOrder, isFetching } = usePlaceOrder();

	if (!invoice || !customer)
		return <NotFound>Something went wrong, ¯\_(ツ)_/¯</NotFound>;

	const classes = {
		label: "text-[#808080] text-[16px]",
	};

	return (
		<>
			<div className="flex-1 pb-10 overflow-auto">
				<div className="space-y-4">
					<div className="space-y-1">
						<Label title="Info" icon={<DocumentTextIcon className="w-6" />} />

						<Frame>
							<div className="space-y-3">
								<div className="">
									<p className={classes.label}>Customer:</p>
									<p className="text-3xl">{customer.customer_name}</p>
								</div>
								<div className="">
									<p className={classes.label}>Payment</p>
									<p className="text-[18px]">
										{invoice.payment === "no" ? "No" : "Tien mat"}
									</p>
								</div>
							</div>
						</Frame>
					</div>
					<div className="space-y-1">
						<Label
							title="Products"
							icon={<ShoppingBagIcon className="w-6" />}
						/>
						<Frame>
							<div className="gap-1">
								{invoice.items.map((iItem, i) => (
									<CheckoutInvoiceItem invoiceItem={iItem} key={i} />
								))}
							</div>
							<div className="mt-5">
								<p>Total:</p>
								<p>{moneyFormat(totalInvoicePrice)}</p>
							</div>
						</Frame>
					</div>
				</div>
			</div>

			<div className="fixed bg-white bottom-0 left-0 right-0 border-t border-black/10 py-2 md:p-[16px]">
				<div className="container max-w-[800px] flex justify-between">
					<Button href="/cart">
						<ChevronLeftIcon className="w-6" />
						<span>Cart</span>
					</Button>
					<Button loading={isFetching} onClick={placeOrder}>
						<span>Place order</span>
					</Button>
				</div>
			</div>
		</>
	);
}
