import { Image, ScrollView, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text, View } from "~/components/core";

const LoginScreen = () => {
  const { startSSOFlow } = useSSO();
  const { top } = useSafeAreaInsets();

  const handleAppleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_apple",
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  const openLink = async () => {
    WebBrowser.openBrowserAsync("https://k3portfolio.vercel.app/");
  };

  return (
    <ScrollView className="mt-8 gap-10" style={{ paddingTop: top }}>
      <Image
        source={require("~/assets/images/icon.png")}
        className="h-[80px] self-center"
        resizeMode="contain"
      />
      <Image
        source={require("~/assets/images/login-banner.png")}
        className="mt-6 h-[280px] scale-[1.25] self-center"
        resizeMode="contain"
      />
      <Text className="mx-[50px] mb-10 mt-8 text-center font-bold text-[25px]">
        Delivering Digital Dreams
      </Text>

      <View className="mx-10 gap-5">
        <AuthButton onPress={handleAppleLogin}>
          <Ionicons name="logo-apple" size={24} />
          <Text className="font-medium text-xl">Continue with Apple</Text>
        </AuthButton>

        <AuthButton onPress={handleGoogleLogin}>
          <Ionicons name="logo-google" size={24} />
          <Text className="font-medium text-xl">Continue with Google</Text>
        </AuthButton>

        <AuthButton onPress={handleGoogleLogin}>
          <Ionicons name="mail" size={24} />
          <Text className="font-medium text-xl">Continue with Email</Text>
        </AuthButton>

        <Text className="text-center text-sm text-muted-foreground/60">
          By continuing you agree to Todoist's{" "}
          <Text
            className="text-sm text-muted-foreground/60 underline"
            onPress={openLink}
          >
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text
            className="text-sm text-muted-foreground/60 underline"
            onPress={openLink}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </ScrollView>
  );
};

function AuthButton({
  children,
  ...restProps
}: React.ComponentProps<typeof TouchableOpacity>) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-center gap-[10px] rounded-xl border border-border p-3"
      {...restProps}
    >
      {children}
    </TouchableOpacity>
  );
}

export default LoginScreen;
