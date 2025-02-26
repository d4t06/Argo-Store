import MyButton from "@/components/MyButton";
// import { useProductContext } from "@/stores/ProductContext";
import { Dispatch, SetStateAction } from "react";
import { TextInput } from "react-native";
import Frame from "./ui/Frame";
import Ionicons from '@expo/vector-icons/Ionicons';
// import MyModal from "./ui/Modal";
// import BarcodeScanner from "./modals/BarcodeScannerModal";
// import { useCartContext } from "@/stores/CartContext";
// import { useRouter } from "expo-router";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function ProductSearchBar({ value, setValue }: Props) {
  //   const { products, setCurrentProductData } = useProductContext();
  //   const { select } = useCartContext();

  //   const [isOpenScanner, setIsOpenScanner] = useState(false);

  //   const router = useRouter();

  //   const handleScanned = (code: string) => {
  //     const foundedIndex = products.findIndex((p) => p.barcode === code);

  //     if (foundedIndex === -1) return alert("Product not found");

  //     const foundedProduct = products[foundedIndex];

  //     switch (variant) {
  //       case "home":
  //         select(foundedProduct);
  //         router.push("/(lobby)/(home)/cart");

  //         break;
  //       case "menu-product":
  //         setCurrentProductData({ product: foundedProduct, index: foundedIndex });
  //         router.push(`/menu/products/edit-product/${foundedProduct.id}`);
  //         break;
  //     }
  //   };

  return (
    <>
      <Frame colors={'second'} className="flex-row  gap-2 justify-between items-center">
        <TextInput
          value={value}
          onChangeText={(v) => setValue(v)}
          placeholder="..."
          placeholderTextColor={"#808080"}
          className="flex-grow text-[18px] h-full bg-white px-2 rounded-md outline-none"
        />

        {/* <MyButton
          onPress={() => setIsOpenScanner(true)}
          backStyle="translate-y-[2px]"
          sizes={"clear"}
          fontStyle="p-2"
        >
          <CameraIcon size={24} color={"white"} />
        </MyButton> */}
        <MyButton
          onPress={() => (value ? setValue("") : {})}
          backStyle="translate-y-[2px]"
          sizes={"clear"}
          fontStyle="p-2"
        >
          {value ? (
            <Ionicons name="close" color={'white'}  size={24}/>
          ) : (
            <Ionicons name="search" color={'white'}  size={24}/>
          )}

        </MyButton>
      </Frame>

      {/* <MyModal isOpen={isOpenScanner}>
        <BarcodeScanner
          onScanned={handleScanned}
          closeModal={() => setIsOpenScanner(false)}
        />
      </MyModal> */}
    </>
  );
}
