import { serverTimestamp, Timestamp } from "firebase/firestore";

export const sleep = async (delay: number) =>
  new Promise((rs) => setTimeout(rs, delay));

export const convertToEn = (name: string): string => {
  const converter = (str: string) => {
    const newString = str
      .toLocaleLowerCase()
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ắ|ằ|ẳ|ẵ|ặ/g, "a")
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
      .replace(/ì|í|ị|ỉ|ĩ/g, "i")
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
      .replace(/ỳ|ý|ý|ỷ|ỹ/g, "y")
      .replace(/đ/g, "d");
    return newString;
  };
  return converter(name).replaceAll(/[\W_]/g, "-");
};

export const initProductObject = (
  data: Partial<ProductSchema> & { user_email: string },
) => {
  const newProduct: ProductSchema = {
    units: [],
    image_path: "",
    image_url: "",
    product_name: "",
    product_name_ascii: "",
    stock: 0,
    debt_price: 0,
    stock_price: 0,
    barcode: "",
    created_at: serverTimestamp(),
    ...data,
  };

  return newProduct;
};

export const initCustomerObject = (
  data: Partial<CustomerSchema> & { user_email: string },
) => {
  const newCus: CustomerSchema = {
    address: "",
    customer_name: "",
    phone_number: "",
    total_buy: 0,
    total_debt: 0,
    created_at: serverTimestamp(),
    ...data,
  };

  return newCus;
};

export const convertFirestoreTimestampToString = (timeStamp: Timestamp) => {
  return new Date(timeStamp.toDate().getTime()).toLocaleString();
};
