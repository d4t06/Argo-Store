import {
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};
export type ModalRef = {
  toggle: () => void;
  open: () => void;
  close: () => void;
};
function Modal({ children }: Props, ref: Ref<ModalRef>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggle = () => {
    if (isMounted) setIsMounted(false);
    if (!isOpen) setIsOpen(true);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsMounted(false);
  };

  useImperativeHandle(ref, () => ({
    toggle,
    open,
    close,
  }));

  useEffect(() => {
    if (!isMounted) {
      setTimeout(() => {
        setIsOpen(false);
      }, 200);
    }
  }, [isMounted]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const classes = {
    unMountedContent: "opacity-0 scale-[0.6]",
    mountedContent: "opacity-100 scale-[1]",
    unMountedLayer: "opacity-0",
    mountedLayer: "opacity-100",
  };

  return (
    <>
      {isOpen &&
        createPortal(
          <>
            <div
              className={`fixed transition-opacity ease-linear duration-200 inset-0 bg-black opacity-60
                                ${
                                  isMounted
                                    ? classes.mountedLayer
                                    : classes.unMountedLayer
                                }
                             `}
              onClick={toggle}
            ></div>
            {children && (
              <div
                className={`fixed transition-[opacity,transform] ease-linear duration-200 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2
                                   ${
                                     isMounted
                                       ? classes.mountedContent
                                       : classes.unMountedContent
                                   }
                                `}
              >
                {children}
              </div>
            )}
          </>,
          document.querySelector("#portals")!
        )}
    </>
  );
}

export default forwardRef(Modal);
