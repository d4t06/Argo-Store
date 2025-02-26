import { ReactNode } from "react";

type LabelProps = {
	title: string;
	icon: ReactNode;
	className?: string;
};
export default function Label({ icon, className = "", title }: LabelProps) {
	return (
		<div className={`flex text-xanh-500 gap-2 items-center ${className}`}>
			{icon}
			<p className="text-xl">{title}</p>
		</div>
	);
}
