import { cva, VariantProps } from "class-variance-authority";
import { ReactNode, useState } from "react";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity, View } from "react-native";
import { ArrowPathIcon } from "react-native-heroicons/outline";

const BackVariant = cva("rounded-2xl", {
  variants: {
    colors: {
      primary: "bg-[#4a826f]",
      second: "",
      clear: "",
    },
  },
  defaultVariants: {
    colors: "primary",
  },
});

const FontVariant = cva(
  "rounded-2xl gap-1 items-center justify-center flex-row",
  {
    variants: {
      colors: {
        primary: "bg-[#5a9e87]",
        second: "",
        clear: "",
      },
      sizes: {
        primary: "px-6 py-2",
        clear: "",
      },
    },
    defaultVariants: {
      colors: "primary",
      sizes: "primary",
    },
  },
);

interface Props
  extends VariantProps<typeof BackVariant>,
    VariantProps<typeof FontVariant> {
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  backStyle?: string;
  fontStyle?: string;
  active?: boolean;
  children: ReactNode;
}

export default function MyButton({
  colors,
  onPress,
  backStyle = "",
  fontStyle = "",
  loading,
  sizes,
  children,
  disabled,
}: Props) {
  const [press, setPress] = useState(false);

  return (
    <View
      aria-disabled={disabled}
      className={`${BackVariant({
        colors,
        className: backStyle,
      })} ${disabled ? "opacity-40" : ""}`}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => setPress(true)}
        onPressOut={() => setPress(false)}
        activeOpacity={1}
        disabled={disabled}
        className={` ${FontVariant({
          colors,
          sizes,
          className: fontStyle,
        })} ${press ? "translate-y-[-3px]" : "translate-y-[-6px]"}`}
      >
        {loading ? <ActivityIndicator color={"white"} /> : children}
      </TouchableOpacity>
    </View>
  );
}
