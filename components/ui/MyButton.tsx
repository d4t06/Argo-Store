import { cva, VariantProps } from "class-variance-authority";
import { ReactNode, useState } from "react";
import { TouchableOpacity, View } from "react-native";

const BackVariant = cva("rounded-2xl", {
   variants: {
      colors: {
         primary: "bg-black",
         clear: "",
      },
      rounded: {
         primary: "",
         xl: "",
         lg: "",
         clear: "",
      },
   },
   defaultVariants: {
      colors: "primary",
      rounded: "primary",
   },
});

const FontVariant = cva(
   "rounded-2xl flex space-x-1 items-center justify-center flex-row",
   {
      variants: {
         colors: {
            primary: "bg-[#8fc79a]",
            clear: "",
         },
         sizes: {
            primary: "px-6 py-2",
            clear: "",
         },
         rounded: {
            primary: "",
            xl: "",
            lg: "",
            clear: "",
         },
      },
      defaultVariants: {
         colors: "primary",
         sizes: "primary",
         rounded: "primary",
      },
   }
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
   fontStyle,
   sizes,
   children,
   disabled,
   rounded,
}: Props) {
   const [press, setPress] = useState(false);

   return (
      <View
         className={`${BackVariant({
            colors,
            rounded,
            className: backStyle,
         })} `}
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
               rounded,
               className: fontStyle,
            })} ${press ? "translate-y-[-3px]" : "translate-y-[-6px]"}`}
         >
            {children}
         </TouchableOpacity>
      </View>
   );
}
