import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

type Props = {
  toast: Toast;
  onClick?: (id: string) => void;
  className?: string;
  variant?: "notify";
};

type MessageProps = {
  className?: string;
  message: string;
  variant?: "message";
};

export default function ToastItem({
  className = "",
  ...props
}: Props | MessageProps) {
  const variant = props.variant || "notify";
  const [isOpen, setIsOpen] = useState(false);

  const classes = {
    icon: `w-6`,
    container: `transition-[transform,opacity] px-3 py-1 gap-1 rounded-md flex-row items-center border border-black/10`,
    text: `text-white text-[16px]`,
    open: "opacity-[1] translate-x-0",
    init: "opacity-0 -translate-x-10",
  };

  const bgColor =
    props.variant === "notify"
      ? props.toast.variant === "success"
        ? "bg-green-500"
        : "bg-red-500"
      : "bg-[#5a9e87]";

  const renderIcon = () => {
    if (props.variant === "notify") {
      switch (props.toast.variant) {
        case "success":
          return <CheckIcon className="w-6" />;
        case "error":
          return <XMarkIcon className="w-6" />;
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 0);
  }, []);

  return (
    <div
      onClick={() =>
        props.variant === "notify" && props.onClick
          ? props.onClick(props.toast.id)
          : undefined
      }
      className={`${classes.container} ${bgColor} ${className} ${isOpen ? classes.open : classes.init} `}
    >
      {variant === "notify" && renderIcon()}

      <p className={classes.text}>
        {/*@ts-ignore*/}
        {variant === "notify" && props.toast.desc}
        {props.variant === "message" && props.message}
      </p>
    </div>
  );
}
