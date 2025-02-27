//@ts-ignore
import html2pdf from "html2pdf.js";

export default function usePrinter() {
  const print = async (content: string) => {
    try {
      html2pdf()
        .set({
          image: { type: "jpeg", quality: 1 },
          margin: 20,
          jsPDF: {
            format: "a5",
          },
        })
        .from(content)
        .save();
    } catch (error) {
      console.log(error);
      alert("Error when printing");
    }
  };

  return print;
}
