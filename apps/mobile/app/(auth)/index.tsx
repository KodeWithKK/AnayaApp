import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import {
  Button,
  Input,
  InputGroup,
  Label,
  Spinner,
  TextField,
  useThemeColor,
  useToast,
} from "heroui-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/app-text";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/store/auth-store";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const refreshSession = useAuthStore((state) => state.refreshSession);
  const accentColor = useThemeColor("accent");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.show({
        variant: "warning",
        label: "Required",
        description: "Please enter your email and password",
        icon: <Ionicons name="warning" size={20} color={accentColor} />,
      });
      return;
    }
    setIsEmailLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });
      if (!error) {
        await refreshSession();
      } else {
        toast.show({
          variant: "danger",
          label: "Login Failed",
          description: error.message || "Invalid credentials",
          icon: <Ionicons name="alert-circle" size={20} color="#ff4444" />,
        });
      }
    } catch {
      toast.show({
        variant: "danger",
        label: "Error",
        description: "An unexpected error occurred",
        icon: <Ionicons name="alert-circle" size={20} color="#ff4444" />,
      });
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: Linking.createURL("/"),
      });
      if (error) {
        toast.show({
          variant: "danger",
          label: "Google Login Failed",
          description: error.message || "Something went wrong",
          icon: <Ionicons name="alert-circle" size={20} color="#ff4444" />,
        });
      } else {
        await refreshSession();
      }
    } catch {
      toast.show({
        variant: "danger",
        label: "Error",
        description: "An unexpected error occurred",
        icon: <Ionicons name="alert-circle" size={20} color="#ff4444" />,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <ScrollView
        className="bg-background flex-1"
        contentContainerClassName="flex-grow justify-center px-8"
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: insets.top }}>
        <View className="mb-12 items-center">
          <View className="bg-accent/10 h-20 w-20 items-center justify-center rounded-3xl">
            <MaterialCommunityIcons
              name="account-outline"
              size={48}
              color={accentColor}
            />
          </View>
          <AppText className="text-foreground mt-4 text-4xl font-bold tracking-tight">
            Anaya
          </AppText>
          <AppText className="text-muted mt-1 text-base font-medium">
            Your Premium Fashion Destination
          </AppText>
        </View>

        <View className="gap-6">
          <View className="gap-2">
            <Label className="ml-1">Email</Label>
            <TextField>
              <Input
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                className="text-base"
              />
            </TextField>
          </View>

          <View className="gap-2">
            <View className="ml-1 flex-row items-center justify-between">
              <Label>Password</Label>
              <TouchableOpacity
                onPress={() => router.push("/(auth)/forgot-password" as any)}>
                <AppText className="text-accent text-sm font-semibold">
                  Forgot Password?
                </AppText>
              </TouchableOpacity>
            </View>
            <InputGroup>
              <InputGroup.Input
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="text-base"
              />
              <InputGroup.Suffix>
                <TouchableOpacity
                  className="px-4"
                  onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={22}
                    color="#888"
                  />
                </TouchableOpacity>
              </InputGroup.Suffix>
            </InputGroup>
          </View>

          <Button
            variant="primary"
            onPress={handleLogin}
            isDisabled={isEmailLoading}
            size="lg">
            {isEmailLoading ? (
              <Spinner size="sm" className="text-white" />
            ) : (
              <Button.Label className="font-semibold">Sign In</Button.Label>
            )}
          </Button>

          <View className="flex-row items-center gap-4 py-4">
            <View className="bg-border/60 h-px flex-1" />
            <Label>or continue with</Label>
            <View className="bg-border/60 h-px flex-1" />
          </View>

          <Button
            variant="secondary"
            onPress={handleGoogleLogin}
            isDisabled={isGoogleLoading}>
            {isGoogleLoading ? (
              <Spinner size="sm" className="text-accent" />
            ) : (
              <View className="flex-row items-center gap-3">
                <MaterialCommunityIcons
                  name="google"
                  size={24}
                  color="#DB4437"
                />
                <Button.Label className="text-foreground text-base font-semibold">
                  Google
                </Button.Label>
              </View>
            )}
          </Button>
        </View>

        <View className="mt-12 mb-8 flex-row justify-center gap-1">
          <AppText className="text-muted text-base font-medium">
            Don&apos;t have an account?
          </AppText>
          <TouchableOpacity
            onPress={() => {
              console.log("Navigating to signup");
              router.push("/(auth)/signup");
            }}
            activeOpacity={0.6}>
            <AppText className="text-accent text-base font-semibold">
              Sign Up
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
