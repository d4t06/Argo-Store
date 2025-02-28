import Header from "@/components/Header";
import { Button } from "@/components/ui";
import useAuthAction from "@/hooks/useAuthAction";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function SettingPage() {
	const { action } = useAuthAction();

	const handleLogout = () => {
		action({
			type: "logout",
		});
	};

	return (
		<>
			<Header title="Setting" />

			<p className="text-center mt-auto">
				<Button onClick={handleLogout}>
					<ArrowLeftStartOnRectangleIcon className="w-6" />
					<span>Logout</span>
				</Button>
			</p>
		</>
	);
}
