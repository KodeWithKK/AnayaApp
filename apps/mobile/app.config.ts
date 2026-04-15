import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Anaya",
  slug: "anaya",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "anaya",
  userInterfaceStyle: "light",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.kodewithkk.anaya",
    icon: {
      light: "./assets/images/icon.png",
      dark: "./assets/images/icon.png",
    },
  },
  android: {
    icon: "./assets/images/icon.png",
    package: "com.kodewithkk.anaya",
    predictiveBackGestureEnabled: false,
  },
  plugins: [
    "expo-router",
    "expo-font",
    "expo-image",
    "expo-web-browser",
    // "react-native-bottom-tabs",
    // [
    //   "@sentry/react-native/expo",
    //   {
    //     url: "https://sentry.io/",
    //     project: "k3projects",
    //     organization: "kodewithkk",
    //   },
    // ],
    ["expo-dev-launcher", { launchMode: "most-recent" }],
    [
      "expo-splash-screen",
      {
        backgroundColor: "#ffffff",
        image: "./assets/images/splash-light.png",
        resizeMode: "contain",
        imageWidth: 200,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: "7f567aa0-6b30-4892-9692-9540651e0237",
    },
  },
});
