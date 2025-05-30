import { moneyFormat } from "@/utils/moneyFormat";
import Input from "./Input";

type Props = {
  value: number;
  setValue: (v: number) => void;
};

export default function CurrencyInput({ value, setValue }: Props) {
  return (
    <div className="w-full">
      <Input
        step={1000}
        min={0}
        placeholder="0"
        value={value ? value.toString() : ""}
        onChange={(e) =>
          !isNaN(+e.target.value) ? setValue(+e.target.value) : ""
        }
      />
      <span className="text-[#888] text-[16px] mt-1">
        Formatted: {moneyFormat(value)}
      </span>
    </div>
  );
}
