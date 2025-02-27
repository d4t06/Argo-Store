import { useAuth } from "@/stores/AuthContext";
import { useReceivingCartContext } from "@/stores/local/ReceivingCartContext";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function useCheckoutReceiving() {
  const { user } = useAuth();
  const { cartItems, setReceiving } = useReceivingCartContext();

  const navigate = useNavigate();

  const checkout = async () => {
    if (!user) return;

    const receivingItems: ReceivingItem[] = [];

    cartItems.forEach((c) => {
      const item: ReceivingItem = {
        product_name: c.product_name,
        product_image_url: c.image_url,
        product_id: c.id,
        quantity: c.quantity,
        price: c.price,
      };

      receivingItems.push(item);
    });

    const totalPrice = receivingItems.reduce(
      (prev, cur) => prev + cur.price * cur.quantity,
      0,
    );

    const receiving: ReceivingSchema = {
      user_email: user.email,
      items: receivingItems,
      total_price: +totalPrice.toFixed(1),
      created_at: serverTimestamp(),
    };

    setReceiving(receiving);

    navigate("/menu/receive/checkout");
  };
  return { checkout };
}
