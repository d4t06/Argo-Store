import { moneyFormat } from "@/utils/moneyFormat";
import Input from "./Input";

type Props = {
  value: number;
  setValue: (v: number) => void;
  className?: string;
};

export const inputClassName =
  "p-2 text-[16px] border bg-white border-black/10 rounded outline-none w-full";

export default function CurrencyInput({ value, setValue, className }: Props) {
  return (
    <div className="w-full">
      <Input
        type="number"
        placeholder="0"
        value={value ? value.toString() : ""}
        onChange={(v) => (!isNaN(+v) ? setValue(+v) : "")}
        className={`${inputClassName} ${className}`}
      />
      <span className="text-[#808080] text-[16px] mt-1">
        Formatted: {moneyFormat(value)}
      </span>
    </div>
  );
}
