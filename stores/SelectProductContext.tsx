import { ReactNode, createContext, useContext, useState } from "react";

const useSelectSong = () => {
  const [selectedProducts, setSelectedProducts] = useState<ProductList[]>([]);

  const select = (p: ProductList) => {
    const newSongs = [...selectedProducts];
    const index = newSongs.findIndex((s) => s.id === p.id);

    if (index === -1) newSongs.push(p);
    else newSongs.splice(index, 1);

    setSelectedProducts(newSongs);
  };

  const resetSelect = () => {
    setSelectedProducts([]);
  };

  return {
    setSelectedProducts,
    selectedProducts,
    resetSelect,
    select,
  };
};

type ContextType = ReturnType<typeof useSelectSong>;

const Context = createContext<ContextType | null>(null);

export default function ProductSelectProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Context.Provider value={useSelectSong()}>{children}</Context.Provider>
  );
}

export const useProductSelectContext = () => {
  const ct = useContext(Context);
  if (!ct) throw new Error("SelectSongContext not provided");
  return ct;
};
