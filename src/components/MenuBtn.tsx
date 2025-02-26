import { useState } from "react";
import { Button } from "./ui";
import {
	Bars3Icon,
	CubeIcon,
	DocumentTextIcon,
	HomeIcon,
	HomeModernIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function MenuBtn() {
	const [isOpen, setIsOpen] = useState(false);

	const classes = {
		linkItem: "inline-flex space-x-1 py-1.5",
	};

	return (
		<>
			<Button
				onClick={() => setIsOpen(!isOpen)}
				size={"clear"}
				className="p-2 !absolute left-[10px] bottom-5"
			>
				<Bars3Icon className="w-6" />
			</Button>

			<div
				onClick={() => setIsOpen(false)}
				className={`absolute bg-white flex flex-col border border-black/10 rounded-lg shadow-lg transition-[left] bottom-[80px] p-2 ${isOpen ? "left-[10px]" : "-left-full"}`}
			>
				<Link to={"/"} className={classes.linkItem}>
					<HomeIcon className="w-6" />
					<span>Home</span>
				</Link>

				<Link to={"/menu/product"} className={classes.linkItem}>
					<CubeIcon className="w-6" />
					<span>Product</span>
				</Link>

				<Link to={"/menu/customer"} className={classes.linkItem}>
					<UserIcon className="w-6" />
					<span>Customer</span>
				</Link>

				<Link to={"/menu/invoice"} className={classes.linkItem}>
					<DocumentTextIcon className="w-6" />
					<span>Invoice</span>
				</Link>

				<Link to={"/menu/receive"} className={classes.linkItem}>
					<HomeModernIcon className="w-6" />
					<span>Receive</span>
				</Link>
			</div>
		</>
	);
}
