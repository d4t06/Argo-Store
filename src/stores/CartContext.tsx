import { ReactNode, createContext, useContext, useState } from "react";

function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const select = (p: Product) => {
    const newProducts = [...cartItems];
    const index = newProducts.findIndex((s) => s.id === p.id);

    const checkoutProductUnits = p.units.map((u) => {
      const unit: CartItemUnit = { ...u, quantity: 0 };

      return unit;
    });
    const checkoutProduct: CartItem = {
      ...p,
      units: checkoutProductUnits,
      total: 0,
      total_quantity: 0
    };

    if (index === -1) newProducts.push(checkoutProduct);
    else newProducts.splice(index, 1);

    setCartItems(newProducts);
  };

  type UpdateProductProps = {
    index: number;
    product: Partial<CartItem>;
  };

  const updateCartItem = ({ index, product }: UpdateProductProps) => {
    const newProducts = [...cartItems];

    newProducts[index] = {
      ...newProducts[index],
      ...product,
    };

    setCartItems(newProducts);
  };

  type UpdateUnitProps = {
    productIndex: number;
    unitIndex: number;
    unit: Partial<CartItemUnit>;
  };

  const updateUnit = ({ productIndex, unit, unitIndex }: UpdateUnitProps) => {
    const targetUnit = {
      ...cartItems[productIndex].units[unitIndex],
    };

    if (!targetUnit) return;

    Object.assign(targetUnit, unit);

    const newUnits = [...cartItems[productIndex].units];
    newUnits[unitIndex] = targetUnit;

    updateCartItem({
      index: productIndex,
      product: { units: newUnits },
    });
  };

  type Action = {
    productIndex: number;
    unitIndex: number;
    type: "increase" | "decrease";
  };

  const action = (props: Action) => {
    const targetUnit = {
      ...cartItems[props.productIndex].units[props.unitIndex],
    };

    if (!targetUnit) return;

    let newQuantity = targetUnit.quantity;

    switch (props.type) {
      case "increase":
        newQuantity = newQuantity + 1;

        break;
      case "decrease":
        newQuantity = newQuantity - 1;
        break;
    }

    if (newQuantity < 0) return;

    updateUnit({
      productIndex: props.productIndex,
      unit: { quantity: newQuantity },
      unitIndex: props.unitIndex,
    });
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
    action,
    remove,
    updateCartItem,
    updateUnit
  };
}

type ContextType = ReturnType<typeof useCart>;

const Context = createContext<ContextType | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
  return <Context.Provider value={useCart()}>{children}</Context.Provider>;
}

export const useCartContext = () => {
  const ct = useContext(Context);
  if (!ct) throw new Error("SelectSongContext not provided");
  return ct;
};
