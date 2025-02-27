// import { Platform } from "react-native";

// import * as FileSystem from "expo-file-system";
// import * as IntentLauncher from "expo-intent-launcher";

export default function usePrinter() {
  const print = async (content: string) => {
    try {
      window.print();

      // return;
      // if (Platform.OS === "ios") {
      // } else {
      //   const result = await FileSystem.getContentUriAsync(uri);
      //   IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
      //     data: result,
      //     flags: 1,
      //     type: "application/pdf",
      //   });
      // }
    } catch (error) {
      console.log(error);
      alert("Error when printing");
    }
  };

  return print;
}
