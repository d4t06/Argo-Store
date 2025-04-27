import Header from "@/components/Header";
import MenuBtn from "@/components/MenuBtn";
import ReceivingItem from "@/components/ReceivingItem";
import { Button, Loading, NoResult } from "@/components/ui";
import useGetReceives from "@/hooks/useGetReceives";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

export default function ReceivesScreen() {
  const {
    isFetching,
    receives,
    shouldFetchWarehouseEntries,
    setIsFetching,
    getWarehouseEntries,
  } = useGetReceives();

  useEffect(() => {
    if (shouldFetchWarehouseEntries.current) {
      shouldFetchWarehouseEntries.current = false;

      console.log("get receives");
      getWarehouseEntries();
    } else setIsFetching(false);
  }, []);

  return (
    <>
      <Header title="Receive" />
      <MenuBtn />
      <Button
        href={"/menu/receive/add"}
        size={"clear"}
        className="!absolute p-2 bottom-7 right-5"
      >
        <PlusIcon className="w-6" />
      </Button>

      {isFetching ? (
        <Loading />
      ) : (
        <>
          {receives.length ? (
            <div className="space-y-2.5 overflow-auto pb-[20]">
              {receives.map((receiving, i) => (
                <ReceivingItem receiving={receiving} key={i} />
              ))}
            </div>
          ) : (
            <NoResult className="flex-1" />
          )}
        </>
      )}
    </>
  );
}
