import { useNavigationContext } from "@/stores/NavigateContext";
import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function useBrowserHistory() {
	const { setAhead, setBehind, ahead } = useNavigationContext();

	const location = useLocation();

	const shouldStoreLocation = useRef(true);
	const firstTimeRunEffect = useRef(true);

	const currentLocation = useMemo(
		() => location.pathname + location.search,
		[location],
	);

	useEffect(() => {
		if (firstTimeRunEffect.current) {
			firstTimeRunEffect.current = false;
			return;
		}

		return () => {
			if (shouldStoreLocation.current) {
				if (ahead.length) setAhead([]);
				setBehind((prev) => [...prev, currentLocation]);
			} else shouldStoreLocation.current = true;
		};
	}, [location.pathname]);
}
