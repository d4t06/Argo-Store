import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./stores/AuthContext.tsx";
import ProductsProvider from "./stores/ProductContext.tsx";
import CartProvider from "./stores/CartContext.tsx";
import CheckoutProvider from "./stores/CheckoutContext.tsx";
import ToastProvider from "./stores/ToastContex.tsx";
import CustomerProvider from "./stores/CustomerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProductsProvider>
      <CustomerProvider>
        <CartProvider>
          <CheckoutProvider>
            <ToastProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </ToastProvider>
          </CheckoutProvider>
        </CartProvider>
      </CustomerProvider>
    </ProductsProvider>
  </StrictMode>
);
