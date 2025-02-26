import { Dispatch, SetStateAction } from "react";
import Frame from "./ui/Frame";
import { Button, Input } from "./ui";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};
export default function CustomerSearchBar({ value, setValue }: Props) {
  return (
    <Frame
      colors={"second"}
      className="flex-row gap-2 justify-between items-center"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="..."
      />
      <Button
        onClick={() => (value ? setValue("") : {})}
        size={"clear"}
        className="p-2"
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
