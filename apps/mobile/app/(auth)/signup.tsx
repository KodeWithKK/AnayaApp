import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const accentColor = useThemeColor("accent");

  const handleSignup = async () => {
    if (!email || !password || !name) {
      toast.show({
        variant: "warning",
        label: "Required",
        description: "Please fill in all fields",
        icon: <Ionicons name="warning" size={20} color={accentColor} />,
      });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (!error) {
        toast.show({
          variant: "success",
          label: "Success",
          description: "Please verify your email",
          icon: <Ionicons name="checkmark-circle" size={20} color="#44bb44" />,
        });
        router.push({
          pathname: "/(auth)/verification",
          params: { email },
        });
      } else {
        toast.show({
          variant: "danger",
          label: "Signup Failed",
          description: error.message || "Failed to create account",
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
        <View className="mb-10 items-center">
          <View className="bg-accent/10 h-20 w-20 items-center justify-center rounded-3xl">
            <MaterialCommunityIcons
              name="account-plus-outline"
              size={42}
              color={accentColor}
            />
          </View>
          <AppText className="text-foreground mt-4 text-3xl font-bold tracking-tight">
            Create Account
          </AppText>
          <AppText className="text-muted mt-1 text-base font-medium">
            Join our fashion community
          </AppText>
        </View>

        <View className="gap-6">
          <View className="gap-2">
            <Label className="ml-1">Full Name</Label>
            <TextField>
              <Input
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                className="text-base"
              />
            </TextField>
          </View>

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
            <Label className="ml-1">Password</Label>
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
            onPress={handleSignup}
            isDisabled={isLoading}
            size="lg"
            className="mt-4">
            {isLoading ? (
              <Spinner size="sm" color="white" />
            ) : (
              <Button.Label className="font-semibold">Sign Up</Button.Label>
            )}
          </Button>
        </View>

        <View className="mt-12 mb-8 flex-row justify-center gap-1">
          <AppText className="text-muted text-base font-medium">
            Already have an account?
          </AppText>
          <TouchableOpacity
            onPress={() => {
              console.log("Navigating to login");
              router.push("/");
            }}
            activeOpacity={0.6}>
            <AppText className="text-accent text-base font-semibold">
              Sign In
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
