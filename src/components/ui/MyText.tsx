import { VariantProps, cva } from "class-variance-authority";
import { ReactNode } from "react";

const Variant = cva("", {
  variants: {
    colors: {
      green: "text-[#cee9b6]",
      green1: "text-[#5a9e87]",
      clear: "",
    },
    sizes: {
      primary: "text-[16px]",
      larger: "text-[18px]",
      small: "text-[14px]",
      subTitle: "text-[20px] font-[600]",
      title: "text-[26px] font-[600]",
      clear: "",
    },
  },
  defaultVariants: {
    colors: "clear",
    sizes: "primary",
  },
});

type Props = VariantProps<typeof Variant> & {
  children: ReactNode;
  className?: string;
};

export default function MyText({ children, colors, sizes, className = "" }: Props) {
  return <p className={`${Variant({ colors, sizes, className })}`}>{children}</p>;
}
