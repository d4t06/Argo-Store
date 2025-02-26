import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="flex-1 items-center justify-center">
      <ArrowPathIcon className="w-6 animate-spin" />
    </div>
  );
}
