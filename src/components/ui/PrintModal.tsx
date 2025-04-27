import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useReactToPrint } from "react-to-print";

type Props = {
	isOpen: boolean;
	children: ReactNode;
	close: () => void;
	preview?: boolean;
};

export default function PrintModal({
	isOpen,
	preview,
	children,
	close,
}: Props) {
	const contentRef = useRef<HTMLDivElement>(null);

	const print = useReactToPrint({
		contentRef,
	});

	useEffect(() => {
		if (preview || !isOpen) return;

		print();
	}, [isOpen, preview]);

	if (!isOpen) return <></>;

	return createPortal(
		<div
			onClick={close}
			className="fixed inset-0 bg-black/40 z-[99] flex items-center justify-center"
		>
			<div className="bg-white max-h-[80vh] overflow-hidden p-3 rounded-lg w-[700px] max-w-[90vw]">
				<div ref={contentRef}>{children}</div>
			</div>
		</div>,
		document.querySelector("#portal")!,
	);
}
