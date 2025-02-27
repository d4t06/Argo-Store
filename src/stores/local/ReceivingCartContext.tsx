import { ReactNode, createContext, useContext, useState } from "react";

function useReceivingCart() {
  const [receiving, setReceiving] = useState<ReceivingSchema>();
  const [cartItems, setCartItems] = useState<WarehouseCartItem[]>([]);

  const select = (p: Product) => {
    const newProducts = [...cartItems];
    const index = newProducts.findIndex((s) => s.id === p.id);

    const newCartItem: WarehouseCartItem = {
      ...p,
      price: 0,
      quantity: 0,
    };

    if (index === -1) newProducts.push(newCartItem);
    else newProducts.splice(index, 1);

    setCartItems(newProducts);
  };

  type UpdateProductProps = {
    index: number;
    product: Partial<WarehouseCartItem>;
  };

  const updateCartItem = ({ index, product }: UpdateProductProps) => {
    const newProducts = [...cartItems];

    newProducts[index] = {
      ...newProducts[index],
      ...product,
    };

    setCartItems(newProducts);
  };

  const remove = (index: number) => {
    const items = [...cartItems];
    items.splice(index, 1);

    setCartItems(items);
  };

  const resetSelect = () => {
    setCartItems([]);
  };

  return {
    setCartItems,
    cartItems,
    resetSelect,
    select,
    remove,
    updateCartItem,
    receiving,
    setReceiving,
  };
}

type ContextType = ReturnType<typeof useReceivingCart>;

const Context = createContext<ContextType | null>(null);

export default function ReceivingCartProvider({ children }: { children: ReactNode }) {
  return <Context.Provider value={useReceivingCart()}>{children}</Context.Provider>;
}

export const useReceivingCartContext = () => {
  const ct = useContext(Context);
  if (!ct) throw new Error("WarehouseCartProvider not provided");
  return ct;
};
