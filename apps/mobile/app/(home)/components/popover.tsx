import { useState } from "react";
import { Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button, colorKit, Popover, useThemeColor } from "heroui-native";
import { withUniwind } from "uniwind";

import { AppText } from "../../../components/app-text";
import type { UsageVariant } from "../../../components/component-presentation/types";
import { UsageVariantFlatList } from "../../../components/component-presentation/usage-variant-flatlist";
import { ArrowDownToSquareIcon } from "../../../components/icons/arrow-down-to-square";
import { CodeCompareIcon } from "../../../components/icons/code-compare";
import { CopyIcon } from "../../../components/icons/copy";
import { MapPinIcon } from "../../../components/icons/map-pin";
import { NodesRightIcon } from "../../../components/icons/nodes-right";

const StyledIonicons = withUniwind(Ionicons);

const WithTitleDescriptionContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Popover>
        <Popover.Trigger asChild>
          <Button variant="secondary">Did you know?</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content
            presentation="popover"
            width={320}
            placement="top"
            className="gap-3 px-6 py-5">
            <Popover.Close
              variant="ghost"
              className="absolute top-3 right-2 z-50"
            />
            <View className="mb-1 flex-row items-center gap-3">
              <View className="bg-warning/15 size-12 items-center justify-center rounded-full">
                <StyledIonicons
                  name="rocket"
                  size={26}
                  className="text-warning"
                />
              </View>
              <View className="flex-1">
                <Popover.Title>Fun Fact!</Popover.Title>
              </View>
            </View>
            <Popover.Description
              maxFontSizeMultiplier={1.6}
              className="text-sm">
              The first computer bug was an actual moth found trapped in a
              Harvard Mark II computer in 1947. Grace Hopper taped it to the log
              book with the note &quot;First actual case of bug being
              found.&quot;
            </Popover.Description>
            <View className="mt-2 flex-row items-center gap-2 pt-2">
              <StyledIonicons
                name="sparkles"
                size={14}
                className="text-accent"
              />
              <AppText className="text-muted text-xs">Tech History</AppText>
            </View>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PresentationVariantsContent = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isBottomSheetOpen, setBottomSheetOpen] = useState(false);

  return (
    <View className="flex-1 items-center justify-center gap-8 px-5">
      <Popover isOpen={isPopoverOpen} onOpenChange={setPopoverOpen}>
        <Popover.Trigger asChild>
          <Button variant="secondary">Quick Notification</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay />
          <Popover.Content
            presentation="popover"
            width={300}
            className="gap-3"
            placement="top">
            <View className="items-start gap-2">
              <View className="flex-row items-center gap-3 self-stretch">
                <View className="bg-success/15 size-10 items-center justify-center rounded-full">
                  <StyledIonicons
                    name="checkmark-circle"
                    size={24}
                    className="text-success"
                  />
                </View>
                <View className="flex-1">
                  <Popover.Title>Payment Successful</Popover.Title>
                  <AppText className="text-muted text-xs">
                    2 minutes ago
                  </AppText>
                </View>
              </View>
              <Popover.Description>
                Your payment of $49.99 has been processed successfully. Receipt
                sent to your email.
              </Popover.Description>
            </View>
            <Button variant="secondary" onPress={() => setPopoverOpen(false)}>
              Dismiss
            </Button>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
      <Popover
        presentation="bottom-sheet"
        isOpen={isBottomSheetOpen}
        onOpenChange={setBottomSheetOpen}>
        <Popover.Trigger asChild>
          <Button variant="secondary">More Options</Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Overlay className="bg-black/15" />
          <Popover.Content presentation="bottom-sheet">
            <View className="gap-4">
              <View className="mb-2">
                <Popover.Title className="text-foreground text-center">
                  Share Options
                </Popover.Title>
                <Popover.Description className="text-muted text-center">
                  Choose how you&apos;d like to share this content
                </Popover.Description>
              </View>
              <View className="gap-2">
                <View className="flex-row items-center gap-3 rounded-lg p-3">
                  <View className="bg-accent/10 size-10 items-center justify-center rounded-full">
                    <NodesRightIcon size={18} colorClassName="accent-accent" />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-foreground text-base font-medium">
                      Share Link
                    </AppText>
                    <AppText className="text-muted text-xs">
                      Send via messaging app
                    </AppText>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 rounded-lg p-3">
                  <View className="bg-warning/10 size-10 items-center justify-center rounded-full">
                    <CopyIcon size={20} colorClassName="accent-warning" />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-foreground text-base font-medium">
                      Copy Link
                    </AppText>
                    <AppText className="text-muted text-xs">
                      Copy to clipboard
                    </AppText>
                  </View>
                </View>
                <View className="flex-row items-center gap-3 rounded-lg p-3">
                  <View className="bg-success/10 size-10 items-center justify-center rounded-full">
                    <ArrowDownToSquareIcon
                      size={20}
                      colorClassName="accent-success"
                    />
                  </View>
                  <View className="flex-1">
                    <AppText className="text-foreground text-base font-medium">
                      Save Offline
                    </AppText>
                    <AppText className="text-muted text-xs">
                      Download for later
                    </AppText>
                  </View>
                </View>
              </View>
              <Button
                variant="secondary"
                size="lg"
                className="mt-2 self-stretch"
                onPress={() => setBottomSheetOpen(false)}>
                Cancel
              </Button>
            </View>
          </Popover.Content>
        </Popover.Portal>
      </Popover>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PlacementPopover = ({
  placement,
}: {
  placement: "top" | "bottom" | "left" | "right";
}) => {
  const label = placement.charAt(0).toUpperCase() + placement.slice(1);

  const themeColorBorder = useThemeColor("accent");
  const arrowStroke = colorKit.setAlpha(themeColorBorder, 0.35).hex();

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="secondary" className="w-24">
          <Button.Label maxFontSizeMultiplier={1}>{label}</Button.Label>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content
          presentation="popover"
          placement={placement}
          width={220}
          className="border-accent/35 gap-2 border">
          <Popover.Arrow stroke={arrowStroke} />
          <View className="flex-row items-center gap-2">
            <View className="bg-accent/15 size-8 items-center justify-center rounded-full">
              <MapPinIcon size={16} colorClassName="accent-accent" />
            </View>
            <AppText className="text-foreground text-sm font-semibold">
              Quick Tip
            </AppText>
          </View>
          <AppText className="text-muted text-xs leading-4">
            This popover appears on the {placement} side of the trigger button
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};

const PlacementOptionsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <View className="flex-row justify-between gap-4">
          <PlacementPopover placement="top" />
          <PlacementPopover placement="left" />
        </View>
        <View className="flex-row justify-between gap-4">
          <PlacementPopover placement="right" />
          <PlacementPopover placement="bottom" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const AlignmentPopover = ({ align }: { align: "start" | "center" | "end" }) => {
  const label = align.charAt(0).toUpperCase() + align.slice(1);

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="secondary" className="w-24">
          <Button.Label maxFontSizeMultiplier={1}>{label}</Button.Label>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content
          presentation="popover"
          placement="top"
          align={align}
          width={200}
          className="gap-2">
          <View className="flex-row items-center gap-2">
            <View className="bg-warning/15 size-8 items-center justify-center rounded-full">
              <CodeCompareIcon size={16} colorClassName="accent-warning" />
            </View>
            <AppText
              className="text-foreground flex-1 text-sm font-semibold"
              numberOfLines={1}>
              Alignment
            </AppText>
          </View>
          <AppText className="text-muted text-xs">
            Aligned to the {align} of the trigger
          </AppText>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
};

const AlignmentOptionsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="flex-row gap-4">
        <AlignmentPopover align="start" />
        <AlignmentPopover align="center" />
        <AlignmentPopover align="end" />
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const NativeModalTestContent = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Button
        variant="secondary"
        onPress={() => router.push("/(home)/components/popover-native-modal")}>
        <Button.Label maxFontSizeMultiplier={1.6}>
          Popover from native modal
        </Button.Label>
      </Button>
    </View>
  );
};

// ------------------------------------------------------------------------------

const POPOVER_VARIANTS: UsageVariant[] = [
  {
    value: "with-title-description",
    label: "With title & description",
    content: <WithTitleDescriptionContent />,
  },
  {
    value: "presentation-variants",
    label: "Presentation variants",
    content: <PresentationVariantsContent />,
  },
  {
    value: "placement-options",
    label: "Placement options",
    content: <PlacementOptionsContent />,
  },
  {
    value: "alignment-options",
    label: "Alignment options",
    content: <AlignmentOptionsContent />,
  },
];

if (Platform.OS === "ios") {
  POPOVER_VARIANTS.push({
    value: "native-modal-test",
    label: "Native modal test",
    content: <NativeModalTestContent />,
  });
}

export default function PopoverScreen() {
  return <UsageVariantFlatList data={POPOVER_VARIANTS} />;
}
