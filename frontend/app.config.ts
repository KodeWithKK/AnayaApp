import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Anaya",
  slug: "k3projects",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "k3projects",
  userInterfaceStyle: "light",
  newArchEnabled: false,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.kodewithkk.k3projects",
    icon: {
      light: "./assets/images/icon.png",
      dark: "./assets/images/icon.png",
    },
  },
  android: {
    icon: "./assets/images/icon.png",
    package: "com.kodewithkk.k3projects",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/icon.png",
  },
  plugins: [
    "expo-router",
    "react-native-bottom-tabs",
    [
      "@sentry/react-native/expo",
      {
        url: "https://sentry.io/",
        project: "todoist",
        organization: "kodewithkk",
      },
    ],
    "expo-font",
    [
      "expo-dev-launcher",
      {
        launchMode: "most-recent",
      },
    ],
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
  },
});
