import { receiveCollectionRef } from "@/firebase/firebaseService";
import { getDocs, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "@/stores/AuthContext";
import { useReceivesContext } from "@/stores/local/ReceivesContext";

export default function useGetReceives() {
  const { user } = useAuth();
  const [isFetching, setIsFetching] = useState(true);

  const { setReceives, receives, ...rest } = useReceivesContext();

  const getWarehouseEntries = async () => {
    try {
      if (!user) return;

      const getQuery = query(
        receiveCollectionRef,
        where("user_email", "==", user.email),
        orderBy("created_at", "desc")
      );

      const docSnap = await getDocs(getQuery);

      if (docSnap.docs) {
        const items = docSnap.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id } as Receiving)
        );

        setReceives(items);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    getWarehouseEntries,
    isFetching,
    setIsFetching,
    receives,
    ...rest,
  };
}
