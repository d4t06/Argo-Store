import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, Ref } from "react";

const inputVariants = cva("", {
  variants: {
    variant: {
      primary:
        "bg-white border border-black/10 placeholder:[#808080] text-[16px] outline-none py-1.5 px-2",
      clear: "",
    },
    rounded: {
      xl: "rounded-xl",
      lg: "rounded-lg",
      md: "rounded-md",
    },
  },

  defaultVariants: {
    variant: "primary",
    rounded: "md",
  },
});

type Props = VariantProps<typeof inputVariants> &
  InputHTMLAttributes<HTMLInputElement>;

function Input(
  { variant, className = "", ...rest }: Props,
  ref: Ref<HTMLInputElement>
) {
  return (
    <input
      ref={ref}
      className={`${inputVariants({ variant, className })}`}
      {...rest}
    />
  );
}

export default forwardRef(Input);
