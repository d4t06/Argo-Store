import { useEffect, useState } from "react";
import { View } from "react-native";
import { useToastContext } from "@/stores/ToastContex";
import ToastItem from "./ToastItem";
import Modal from "react-native-modal";

interface Props {
  time?: number;
}

const ToastPortal = ({ time = 6000 }: Props) => {
  const { setToasts, toasts } = useToastContext();
  const [removing, setRemoving] = useState("");

  const removeToast = (id: string) => {
    setToasts((t) => t.filter((toast) => toast.id != id));
  };

  useEffect(() => {
    if (removing) {
      setToasts((t) => t.filter((toast) => toast.id != removing));
    }
  }, [removing]);

  // problem
  // 3 time add toast => run useEffect 3 times, generate setToast time out 3 in background
  // when each setToast time out finish
  // toasts change lead to useEffect run trigger setToast time out after that;
  useEffect(() => {
    if (!toasts.length) return;
    // console.log("run main useEffect");

    const id = toasts[toasts.length - 1].id;
    setTimeout(() => {
      // console.log("run time out check id ", id);
      setRemoving(id);
    }, time);
  }, [toasts]);

  const classes = {
    container: `fixed `,
  };

  return (
    // <Modal transparent accessible style={{ display: "none" }}>

    <Modal
      isVisible
      coverScreen={false}
      hasBackdrop={false}
      style={{ zIndex: 99999 }}
    >
      {/*<View className={classes.container}>*/}
      <View className="justify-start gap-3 z-[9999] fixed mx-auto w-[84vw] top-[10px]">
        {!!toasts.length &&
          toasts.map((toast, index) => (
            <ToastItem
              variant="notify"
              onClick={removeToast}
              key={index}
              toast={toast}
            />
          ))}
      </View>
      {/*</View>*/}
    </Modal>
  );
};

export default ToastPortal;
