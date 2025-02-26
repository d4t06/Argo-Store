type Toast = {
  variant: "success" | "error";
  desc: string;
  id: string;
};

type User = {
  email: string;
  store_name: string;
  address: string;
  phone_number: string;
};

type UserSchema = Omit<User, "email">;

type Product = {
  id: string;
  user_email: string;
  barcode: string;
  product_name: string;
  product_name_ascii: string;
  image_url: string;
  image_path: string;
  debt_price: number;
  stock: number;
  stock_price: number;
  created_at: Timestamp;
  units: ProductUnit[];
};

type ProductSchema = Omit<Product, "id">;

type ProductUnit = {
  unit_name: string;
  conversion_quantity: number;
  price: number;
};

type CartItemUnit = ProductUnit & {
  quantity: number;
};

type CartItem = Omit<Product, "units"> & {
  units: CartItemUnit[];
  total: number;
  total_quantity: number;
};

type WarehouseCartItem = Omit<Product, "units"> & {
  price: number;
  quantity: number;
};

type Customer = {
  id: string;
  user_email: string;
  customer_name: string;
  phone_number: string;
  address: string;
  total_buy: number;
  total_debt: number;
  created_at: Timestamp;
};

type Invoice = {
  id: string;
  user_email: string;
  customer_id: string;
  customer_name: string;
  payment: "tien-mat" | "no";
  items: InvoiceItem[];
  total_price: number;
  revenue: number;
  created_at: Timestamp;
};

type InvoiceSchema = Omit<Invoice, "id">;

type InvoiceItem = {
  product_id: string;
  price: number;
  stock_price: number;
  quantity: number;
  unit_name: string;
  product_name: string;
  product_image_url: string;
};

type Receipt = {
  id: string;
  user_email: string;
  customer_id: string;
  price: number;
  created_at: Timestamp;
};

type ReceiptSchema = Omit<Receipt, "id">;

type CustomerSchema = Omit<Customer, "id">;

type Receiving = {
  id: string;
  user_email: string;
  items: ReceivingItem[];
  total_price: number;
  created_at: Timestamp;
};

type ReceivingSchema = Omit<Receiving, "id">;

type ReceivingItem = {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  product_image_url: string;
};
