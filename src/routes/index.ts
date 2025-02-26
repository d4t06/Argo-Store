import AuthLayout from "@/layouts/AuthLayout";
import Home from "@/pages/home/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

const publicRoutes = [
  {
    path: "/",
    component: Home,
    layout: "",
  },
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

export { publicRoutes };
