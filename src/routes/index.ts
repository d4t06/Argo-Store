import AuthLayout from "@/layouts/AuthLayout";
import CartLayout from "@/layouts/CartLayout";
import CartPage from "@/pages/home/Cart";
import CheckoutPage from "@/pages/home/Checkout";
import FinishedPage from "@/pages/home/Finished";
import Home from "@/pages/home/Home";
import Login from "@/pages/Login";
import MenuCustomerPage from "@/pages/menu/Customer";
import MenuInvoicePage from "@/pages/menu/Invoice";
import MenuProductPage from "@/pages/menu/Product";
import MenuReceivePage from "@/pages/menu/Receipt";
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
    layout: "",
  },
  {
    path: "/cart",
    component: CartPage,
    layout: CartLayout,
  },
  {
    path: "/checkout",
    component: CheckoutPage,
    layout: CartLayout,
  },
  {
    path: "/finished",
    component: FinishedPage,
    layout: CartLayout,
  },
  {
    path: "/menu/product",
    component: MenuProductPage,
    layout: "",
  },
  {
    path: "/menu/customer",
    component: MenuCustomerPage,
    layout: "",
  },
  {
    path: "/menu/invoice",
    component: MenuInvoicePage,
    layout: "",
  },
  {
    path: "/menu/receive",
    component: MenuReceivePage,
    layout: "",
  },
];

export { publicRoutes, protectedRoutes };
