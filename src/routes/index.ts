import AuthLayout from "@/layouts/AuthLayout";
import InvoiceLayout from "@/layouts/InvoiveLayout";
import ReceiveLayout from "@/layouts/ReceiveLayout";
import CartPage from "@/pages/home/Cart";
import CheckoutPage from "@/pages/home/Checkout";
import FinishedPage from "@/pages/home/Finished";
import Home from "@/pages/home/Home";
import Login from "@/pages/Login";
import CreateReceiptPage from "@/pages/menu/customer/CreateReceipt";
import MenuCustomerPage from "@/pages/menu/customer/Customer";
import CustomerDetailPage from "@/pages/menu/customer/CustomerDetail";
import MenuInvoicePage from "@/pages/menu/invoice/Invoice";
import InvoiceDetailPage from "@/pages/menu/invoice/InvoiceDetail";
import MenuProductPage from "@/pages/menu/product/Product";
import ProductDetailPage from "@/pages/menu/product/ProductDetail";
import AddReceivingPage from "@/pages/menu/receive/Add";
import ReceivingCartPage from "@/pages/menu/receive/Cart";
import ReceivingCheckoutPage from "@/pages/menu/receive/Checkout";
import MenuReceivePage from "@/pages/menu/receive/Receive";
import SettingPage from "@/pages/menu/Setting";
import Signup from "@/pages/Signup";

const publicRoutes = [
  {
    path: "/login",
    component: Login,
    layout: AuthLayout,
  },
  {
    path: "/signup",
    component: Signup,
    layout: AuthLayout,
  },
];

const protectedRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/cart",
    component: CartPage,
  },
  {
    path: "/checkout",
    component: CheckoutPage,
  },
  {
    path: "/finished",
    component: FinishedPage,
  },
    {
    path: "/menu/setting",
    component: SettingPage,
  },
  {
    path: "/menu/product",
    component: MenuProductPage,
  },
  {
    path: "/menu/product/:id",
    component: ProductDetailPage,
  },
  {
    path: "/menu/customer",
    component: MenuCustomerPage,
  },
  {
    path: "/menu/customer/:id",
    component: CustomerDetailPage,
  },
  {
    path: "/menu/customer/:id/create-receive",
    component: CreateReceiptPage,
  },
  {
    path: "/menu/invoice",
    component: MenuInvoicePage,
    layout: InvoiceLayout,
  },
  {
    path: "/menu/invoice/:id",
    component: InvoiceDetailPage,
    layout: InvoiceLayout,
  },
  {
    path: "/menu/receive",
    component: MenuReceivePage,
    layout: ReceiveLayout,
  },
  {
    path: "/menu/receive/add",
    component: AddReceivingPage,
    layout: ReceiveLayout,
  },
  {
    path: "/menu/receive/cart",
    component: ReceivingCartPage,
    layout: ReceiveLayout,
  },
  {
    path: "/menu/receive/checkout",
    component: ReceivingCheckoutPage,
    layout: ReceiveLayout,
  },
];

export { publicRoutes, protectedRoutes };
