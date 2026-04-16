import { useState } from "react";
import { Platform, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { BottomSheet, Button } from "heroui-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

import { AppText } from "../../../components/app-text";
import { BottomSheetBlurOverlay } from "../../../components/bottom-sheet-blur-overlay";
import { BasicBottomSheetContent } from "../../../components/bottom-sheet/basic";
import { ScrollableWithSnapPointsContent } from "../../../components/bottom-sheet/scrollable-with-snap-points";
import { WithOTPInputContent } from "../../../components/bottom-sheet/with-otp-input";
import { WithTextInputContent } from "../../../components/bottom-sheet/with-text-input";
import type { UsageVariant } from "../../../components/component-presentation/types";
import { UsageVariantFlatList } from "../../../components/component-presentation/usage-variant-flatlist";

const StyledFontAwesome5 = withUniwind(FontAwesome5);

// ------------------------------------------------------------------------------

const DetachedBottomSheetContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              <Button.Label maxFontSizeMultiplier={1.6}>
                Detached bottom sheet
              </Button.Label>
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content
              detached={true}
              bottomInset={insets.bottom + 12}
              className="mx-4"
              backgroundClassName="rounded-4xl"
              contentContainerClassName="pb-4">
              <View className="mb-5 items-center">
                <View className="">
                  <StyledFontAwesome5
                    name="bitcoin"
                    size={48}
                    className="text-green-500"
                  />
                </View>
              </View>
              <View className="mb-6 items-center">
                <BottomSheet.Title className="text-center text-xl font-bold">
                  Oh! Your wallet is empty
                </BottomSheet.Title>
                <BottomSheet.Description className="text-center">
                  You&apos;ll need to top up to buy
                </BottomSheet.Description>
              </View>
              <Button
                variant="primary"
                className="mb-2 bg-green-500"
                onPress={() => setIsOpen(false)}
                feedbackVariant="scale">
                <Button.Label className="font-semibold text-white">
                  Add Cash
                </Button.Label>
              </Button>
              <View className="flex-row items-center justify-center">
                {["Apple Pay", "Mastercard", "Visa", "Amex"].map(
                  (label, index, array) => (
                    <View key={label} className="flex-row items-center">
                      <AppText
                        className="text-muted text-xs font-normal"
                        maxFontSizeMultiplier={1.2}>
                        {label}
                      </AppText>
                      {index < array.length - 1 && (
                        <AppText
                          className="text-muted mx-1.5 text-xs font-normal"
                          maxFontSizeMultiplier={1.2}>
                          •
                        </AppText>
                      )}
                    </View>
                  ),
                )}
              </View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithBlurOverlayContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              <Button.Label maxFontSizeMultiplier={1.2}>
                Bottom sheet with blur overlay
              </Button.Label>
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheetBlurOverlay />
            <BottomSheet.Content>
              <View className="mb-10 gap-3 px-2">
                <BottomSheet.Title
                  className="text-2xl font-semibold"
                  maxFontSizeMultiplier={1.2}>
                  Delete account?
                </BottomSheet.Title>
                <BottomSheet.Description maxFontSizeMultiplier={1.2}>
                  If you delete your account, you won&apos;t be able to restore
                  it or receive support.
                </BottomSheet.Description>
                <BottomSheet.Description maxFontSizeMultiplier={1.2}>
                  Our app will no longer be able to provide support for any of
                  your trips, such as providing a refund or locking for lost
                  items.
                </BottomSheet.Description>
                <BottomSheet.Description maxFontSizeMultiplier={1.2}>
                  For other deletion options, see our Privacy Policy.
                </BottomSheet.Description>
              </View>
              <View className="gap-3">
                <Button variant="danger" onPress={() => setIsOpen(false)}>
                  Delete forever
                </Button>
                <Button variant="tertiary" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
              </View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const NativeModalBottomSheetContent = () => {
  const router = useRouter();

  if (Platform.OS !== "ios") {
    return null;
  }

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button
          variant="secondary"
          onPress={() =>
            router.push("/(home)/components/bottom-sheet-native-modal")
          }>
          <Button.Label maxFontSizeMultiplier={1.2}>
            Bottom sheet from native modal
          </Button.Label>
        </Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const BOTTOM_SHEET_VARIANTS_IOS: UsageVariant[] = [
  {
    value: "basic-bottom-sheet",
    label: "Basic bottom sheet",
    content: <BasicBottomSheetContent />,
  },
  {
    value: "detached-bottom-sheet",
    label: "Detached bottom sheet",
    content: <DetachedBottomSheetContent />,
  },
  {
    value: "with-blur-overlay",
    label: "With blur overlay",
    content: <WithBlurOverlayContent />,
  },
  {
    value: "scrollable-with-snap-points",
    label: "Scrollable with snap points",
    content: <ScrollableWithSnapPointsContent />,
  },
  {
    value: "native-modal-bottom-sheet",
    label: "Bottom sheet from native modal",
    content: <NativeModalBottomSheetContent />,
  },
  {
    value: "with-text-input",
    label: "Bottom sheet with text input",
    content: <WithTextInputContent />,
  },
  {
    value: "with-otp-input",
    label: "Bottom sheet with OTP input",
    content: <WithOTPInputContent />,
  },
];

const BOTTOM_SHEET_VARIANTS_ANDROID: UsageVariant[] = [
  {
    value: "basic-bottom-sheet",
    label: "Basic bottom sheet",
    content: <BasicBottomSheetContent />,
  },
  {
    value: "detached-bottom-sheet",
    label: "Detached bottom sheet",
    content: <DetachedBottomSheetContent />,
  },
  {
    value: "scrollable-with-snap-points",
    label: "Scrollable with snap points",
    content: <ScrollableWithSnapPointsContent />,
  },
  {
    value: "with-text-input",
    label: "Bottom sheet with text input",
    content: <WithTextInputContent />,
  },
  {
    value: "with-otp-input",
    label: "Bottom sheet with OTP input",
    content: <WithOTPInputContent />,
  },
];

export default function BottomSheetScreen() {
  return (
    <UsageVariantFlatList
      data={
        Platform.OS === "ios"
          ? BOTTOM_SHEET_VARIANTS_IOS
          : BOTTOM_SHEET_VARIANTS_ANDROID
      }
    />
  );
}
