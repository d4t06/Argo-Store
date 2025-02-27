import { db } from "./firebase";
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

type collectionVariant =
  | "Products"
  | "Users"
  | "Receipts"
  | "Invoices"
  | "Customers"
  | "Warehouse_Entries";

const isDev: boolean = process.env.NODE_ENV === "development";

export const productCollectionRef = collection(db, "Products");
export const userCollectionRef = collection(db, "Users");
export const invoiceCollectionRef = collection(db, "Invoices");
export const customerCollectionRef = collection(db, "Customers");
export const receiveCollectionRef = collection(db, "Warehouse_Entries");
export const customerReceiptCollectionRef = collection(db, "Receipts");

export const myDeleteDoc = async ({
  collection,
  id,
  msg,
}: {
  collection: collectionVariant;
  id: string;
  msg?: string;
}) => {
  if (isDev) console.log(msg ?? ">>> api: delete doc");
  await deleteDoc(doc(db, collection, id));
};

export const myGetDoc = async ({
  collection,
  id,
  msg,
}: {
  collection: collectionVariant;
  id: string;
  msg?: string;
}) => {
  if (isDev) console.log(msg ?? ">>> api: get doc");

  return getDoc(doc(db, collection, id));
};

export const myAddDoc = async ({
  collection,
  data,
  msg,
}: {
  collection: CollectionReference;
  data: {};
  msg?: string;
}) => {
  if (isDev) console.log(msg ?? ">>> api: set doc");

  const docRef = await addDoc(collection, data);

  docRef.firestore;
  return docRef.id;
};

export const mySetDoc = async <T>({
  collection,
  id,
  data,
  msg,
}: {
  collection: collectionVariant;
  id: string;
  data: Partial<T>;
  msg?: string;
}) => {
  if (isDev) console.log(msg ?? ">>> api: set doc");

  return await setDoc(doc(db, collection, id), { ...data }, { merge: true });
};
