import * as Print from "expo-print";
// import { Platform } from "react-native";

// import * as FileSystem from "expo-file-system";
// import * as IntentLauncher from "expo-intent-launcher";

import { shareAsync } from "expo-sharing";

export default function usePrinter() {
  const print = async (content: string) => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: content,
        height: 595,
        width: 420,
      });
      await shareAsync(uri);

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
