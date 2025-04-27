// https://hd-mobile-backend-ts.vercel.app/api/pdf

import { useState } from "react";

export default function usePrinter() {
  const [isPrinting, setIsPrinting] = useState(false);
  const isOnMobile = "ontouchstart" in window;

  const print = async (content: string) => {
    try {
      setIsPrinting(true);

      const option = isOnMobile ? { margin: { left: 120, right: 120 } } : {};

      const res = await fetch(
        "https://hd-mobile-backend-ts.vercel.app/api/pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, option }),
        },
      );

      if (res.ok) {
        const payload = await res.json();

        const base64PDF = payload.data;
        const pdfBytes = new Uint8Array(
          atob(base64PDF)
            .split("")
            .map((char) => char.charCodeAt(0)),
        );
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        const pdfURL = URL.createObjectURL(pdfBlob);

        window.open(pdfURL, isOnMobile ? "_self" : "_blank");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsPrinting(false);
    }
  };

  return { print, isPrinting, isOnMobile };
}
