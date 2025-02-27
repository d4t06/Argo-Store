type Props = {
	className?: string;
	title: string;
};

export default function Header({ className = "", title }: Props) {
	return (
		<div className={`text-3xl text-xanh-500 pb-2 ${className}`}>{title}</div>
	);
}
