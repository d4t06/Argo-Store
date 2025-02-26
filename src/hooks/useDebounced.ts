import { useEffect } from "react";
import { useState } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    if (!value.trim()) {
      setDebounceValue("");
      return;
    }

    const timeId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeId);
    };
  }, [value, delay]);

  return debounceValue;
}
