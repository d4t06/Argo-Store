import { useEffect, useRef, useState } from "react";
import { Button, Frame } from "./ui";
import {
	Bars3Icon,
	Cog6ToothIcon,
	CubeIcon,
	DocumentTextIcon,
	HomeIcon,
	HomeModernIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function MenuBtn() {
	const [isOpen, setIsOpen] = useState(false);

	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleWindowClick: EventListener = (e) => {
		if (buttonRef.current?.contains(e.target as Node)) return;
		setIsOpen(false);
	};

	useEffect(() => {
		if (isOpen) window.addEventListener("click", handleWindowClick);

		return () => {
			window.removeEventListener("click", handleWindowClick);
		};
	}, [isOpen]);

	const classes = {
		linkItem: "inline-flex space-x-1 py-1.5 hover:text-xanh-500",
	};

	return (
		<>
			<Button
				ref={buttonRef}
				onClick={() => setIsOpen(!isOpen)}
				size={"clear"}
				className="p-2 !absolute left-[10px] bottom-5"
			>
				<Bars3Icon className="w-6" />
			</Button>

			<Frame
				colors={"third"}
				className={`absolute bg-white flex duration-[.25] flex-col transition-[left,opacity] bottom-[80px] p-2 ${isOpen ? "left-[10px] opacity-[1] pointer-events-auto" : "left-0 opacity-[0] pointer-events-none"}`}
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

				<Link to={"/menu/setting"} className={classes.linkItem}>
					<Cog6ToothIcon className="w-6" />
					<span>Settings</span>
				</Link>
			</Frame>
		</>
	);
}
