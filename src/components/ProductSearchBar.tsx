// import { useProductContext } from "@/stores/ProductContext";
import { Dispatch, SetStateAction } from "react";
import Frame from "./ui/Frame";
import { Button, Input } from "./ui";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function ProductSearchBar({ value, setValue }: Props) {
  return (
    <Frame
      colors={"second"}
      className="flex gap-2 justify-between"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="..."
        className="flex-grow"
      />

      <Button
        onClick={() => (value ? setValue("") : {})}
        size={"clear"}
        className="p-1.5"
      >
        {value ? (
          <XMarkIcon className="w-6" />
        ) : (
          <MagnifyingGlassIcon className="w-6" />
        )}
      </Button>
    </Frame>
  );
}
