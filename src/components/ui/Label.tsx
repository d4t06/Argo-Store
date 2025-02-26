import { ReactNode } from "react";

type LabelProps = {
	title: string;
	icon: ReactNode;
	className?:string
};
export default function Label({ icon, className = '', title }: LabelProps) {
	return (
		<div className={`flex-row gap-2 items-center ${className}`}>
			{icon}
			<p className="text-[#5a9e87] text-2xl">{title}</p>
		</div>
	);
}
