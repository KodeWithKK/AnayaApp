import { useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Button,
  InputGroup,
  Label,
  Spinner,
  useThemeColor,
} from "heroui-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/app-text";
import { authClient } from "@/lib/auth-client";

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const accentColor = useThemeColor("accent");

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (!token) {
      Alert.alert("Error", "Invalid or missing reset token");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.$fetch("/reset-password", {
        method: "POST",
        body: {
          newPassword: password,
          token,
        },
      });

      if (error) {
        Alert.alert("Reset Failed", error.message || "Unknown error occurred");
      } else {
        Alert.alert("Success", "Your password has been reset successfully.", [
          { text: "OK", onPress: () => router.replace("/(auth)") },
        ]);
      }
    } catch {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setIsLoading(false);
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
          onPress={() => router.replace("/(auth)")}
          className="absolute top-4 left-8">
          <Ionicons name="close" size={28} color={accentColor} />
        </TouchableOpacity>

        <View className="mb-12 items-center">
          <View className="bg-accent/10 h-20 w-20 items-center justify-center rounded-3xl">
            <MaterialCommunityIcons
              name="lock-check"
              size={42}
              color={accentColor}
            />
          </View>
          <AppText className="text-foreground mt-6 text-center text-3xl font-bold tracking-tight">
            New Password
          </AppText>
          <AppText className="text-muted mt-2 text-center text-base leading-6 font-medium">
            Please enter your new password below to secure your account.
          </AppText>
        </View>

        <View className="gap-6">
          <View className="gap-2">
            <Label className="ml-1">New Password</Label>
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

          <View className="gap-2">
            <Label className="ml-1">Confirm Password</Label>
            <InputGroup>
              <InputGroup.Input
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
                className="text-base"
              />
            </InputGroup>
          </View>

          <Button
            variant="primary"
            onPress={handleResetPassword}
            isDisabled={isLoading}
            size="lg"
            className="mt-4">
            {isLoading ? (
              <Spinner size="sm" color="white" />
            ) : (
              <Button.Label className="font-semibold">
                Reset Password
              </Button.Label>
            )}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
