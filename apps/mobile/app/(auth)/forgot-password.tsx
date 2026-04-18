import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Button,
  Input,
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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const accentColor = useThemeColor("accent");

  const handleResetRequest = async () => {
    if (!email) {
      toast.show({
        variant: "warning",
        label: "Required",
        description: "Please enter your email address",
        icon: <Ionicons name="warning" size={20} color={accentColor} />,
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await authClient.$fetch("/request-password-reset", {
        method: "POST",
        body: {
          email,
          redirectTo: "anaya://reset-password",
        },
      });

      if (error) {
        toast.show({
          variant: "danger",
          label: "Request Failed",
          description: error.message || "Something went wrong",
          icon: <Ionicons name="alert-circle" size={20} color="#ff4444" />,
        });
      } else {
        toast.show({
          variant: "success",
          label: "Link Sent",
          description: "Check your email for the reset link",
          icon: <Ionicons name="checkmark-circle" size={20} color="#44bb44" />,
        });
        router.back();
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
          onPress={() => router.back()}
          className="absolute top-4 left-8">
          <Ionicons name="arrow-back" size={28} color={accentColor} />
        </TouchableOpacity>

        <View className="mb-12 items-center">
          <View className="bg-accent/10 h-20 w-20 items-center justify-center rounded-3xl">
            <MaterialCommunityIcons
              name="lock-reset"
              size={42}
              color={accentColor}
            />
          </View>
          <AppText className="text-foreground mt-6 text-3xl font-bold tracking-tight">
            Reset Password
          </AppText>
          <AppText className="text-muted mt-2 text-center text-base leading-6 font-medium">
            Enter your email and {"we'll"} send you a link to regain access to
            your account.
          </AppText>
        </View>

        <View className="gap-8">
          <View className="gap-2">
            <Label className="ml-1">Email Address</Label>
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

          <Button
            variant="primary"
            onPress={handleResetRequest}
            isDisabled={isLoading}
            size="lg">
            {isLoading ? (
              <Spinner size="sm" color="white" />
            ) : (
              <Button.Label className="font-semibold">
                Send Reset Link
              </Button.Label>
            )}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
