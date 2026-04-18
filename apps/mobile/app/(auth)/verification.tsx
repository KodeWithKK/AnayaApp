import { useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Button,
  Input,
  Label,
  Spinner,
  TextField,
  useThemeColor,
} from "heroui-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/app-text";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "@/store/auth-store";

export default function VerificationScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const refreshSession = useAuthStore((state) => state.refreshSession);
  const accentColor = useThemeColor("accent");

  const handleVerify = async () => {
    if (otp.length < 6) {
      Alert.alert("Error", "Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email: email || "",
        otp,
      });

      if (error) {
        Alert.alert("Verification Failed", error.message || "Invalid code");
      } else {
        await refreshSession();
        Alert.alert("Success", "Account verified successfully!");
      }
    } catch {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: email || "",
        type: "email-verification",
      });

      if (error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Success", "A new code has been sent to your email.");
      }
    } catch {
      Alert.alert("Error", "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <ScrollView
        className="bg-background flex-1"
        contentContainerClassName="flex-grow justify-center px-8"
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: insets.top }}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-4 left-8">
          <Ionicons name="arrow-back" size={28} color={accentColor} />
        </TouchableOpacity>

        <View className="mb-12 items-center">
          <View className="bg-accent/10 h-20 w-20 items-center justify-center rounded-3xl">
            <MaterialCommunityIcons
              name="email-check-outline"
              size={42}
              color={accentColor}
            />
          </View>
          <AppText className="text-foreground mt-6 text-3xl font-bold tracking-tight">
            Verify Email
          </AppText>
          <AppText className="text-muted mt-2 text-center text-base font-medium">
            {"We've"} sent a 6-digit code to{"\n"}
            <AppText className="text-foreground font-semibold">{email}</AppText>
          </AppText>
        </View>

        <View className="gap-8">
          <View className="gap-2">
            <Label className="ml-1">Verification Code</Label>
            <TextField>
              <Input
                placeholder="000000"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                className="text-center text-2xl font-bold tracking-[10px]"
              />
            </TextField>
          </View>

          <Button
            variant="primary"
            onPress={handleVerify}
            isDisabled={isLoading}
            size="lg">
            {isLoading ? (
              <Spinner size="sm" color="white" />
            ) : (
              <Button.Label className="font-semibold">
                Verify Account
              </Button.Label>
            )}
          </Button>

          <View className="flex-row items-center justify-center gap-1">
            <AppText className="text-muted text-base">
              {"Didn't"} receive a code?
            </AppText>
            <TouchableOpacity onPress={handleResend} disabled={isResending}>
              {isResending ? (
                <Spinner size="sm" color="accent" />
              ) : (
                <AppText className="text-accent text-base font-semibold">
                  Resend Code
                </AppText>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
