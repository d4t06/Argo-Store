import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

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
          return <Ionicons name="checkmark" size={24} className="text-white" />;
        case "error":
          return <Ionicons name="close" size={24} className="text-white" />;
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 0);
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        props.variant === "notify" && props.onClick
          ? props.onClick(props.toast.id)
          : undefined
      }
      className={`${classes.container} ${bgColor} ${className} ${isOpen ? classes.open : classes.init} `}
    >
      {variant === "notify" && renderIcon()}

      <Text className={classes.text}>
        {/*@ts-ignore*/}
        {variant === "notify" && props.toast.desc}
        {props.variant === "message" && props.message}
      </Text>
    </TouchableOpacity>
  );
}
