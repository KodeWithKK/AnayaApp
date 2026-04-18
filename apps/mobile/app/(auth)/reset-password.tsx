import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Button,
  InputGroup,
  Label,
  Spinner,
  useThemeColor,
  useToast,
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const accentColor = useThemeColor("accent");

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.show({
        variant: "warning",
        label: "Required",
        description: "Please fill in all fields",
        icon: <Ionicons name="warning" size={20} color={accentColor} />,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.show({
        variant: "warning",
        label: "Mismatched",
        description: "Passwords do not match",
        icon: <Ionicons name="warning" size={20} color={accentColor} />,
      });
      return;
    }

    if (!token) {
      toast.show({
        variant: "danger",
        label: "Invalid Token",
        description: "Reset token missing or expired",
        icon: <Ionicons name="alert-circle" size={20} color="#ff4444" />,
      });
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
        toast.show({
          variant: "danger",
          label: "Reset Failed",
          description: error.message || "Unknown error occurred",
          icon: <Ionicons name="alert-circle" size={20} color="#ff4444" />,
        });
      } else {
        toast.show({
          variant: "success",
          label: "Success",
          description: "Your password has been reset successfully.",
          icon: <Ionicons name="checkmark-circle" size={20} color="#44bb44" />,
        });
        router.replace("/(auth)");
      }
    } catch {
      toast.show({
        variant: "danger",
        label: "Error",
        description: "An unexpected error occurred",
        icon: <Ionicons name="alert-circle" size={20} color="#ff4444" />,
      });
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
                secureTextEntry={!showConfirmPassword}
                className="text-base"
              />
              <InputGroup.Suffix>
                <TouchableOpacity
                  className="px-4"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={22}
                    color="#888"
                  />
                </TouchableOpacity>
              </InputGroup.Suffix>
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
