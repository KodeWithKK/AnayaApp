import { Pressable, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Avatar, Card, Separator } from "heroui-native";
import { KeyboardController } from "react-native-keyboard-controller";
import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { withUniwind } from "uniwind";

import { AppText } from "../../../components/app-text";
import { Assignee } from "../../../components/showcases/linear-task/dialogs/assignee";
import { Labels } from "../../../components/showcases/linear-task/dialogs/labels";
import { Priority } from "../../../components/showcases/linear-task/dialogs/priority";
import { Project } from "../../../components/showcases/linear-task/dialogs/project";
import { Status } from "../../../components/showcases/linear-task/dialogs/status";
import { simulatePress } from "../../../helpers/utils/simulate-press";

const StyledMaterialCommunityIcons = withUniwind(MaterialCommunityIcons);
const StyledAnimatedScrollView = withUniwind(Animated.ScrollView);

KeyboardController.preload();

export default function LinearTaskScreen() {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  return (
    <StyledAnimatedScrollView
      entering={FadeIn.delay(100)}
      className="bg-background flex-1 px-6"
      style={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 }}
      showsVerticalScrollIndicator={false}>
      <View className="mb-4 flex-row items-center gap-5">
        <Pressable
          className="flex-row items-center gap-1"
          onPress={router.back}>
          <StyledMaterialCommunityIcons
            name="arrow-left"
            size={16}
            className="text-foreground"
          />
          <AppText className="text-foreground text-lg font-medium">
            Back
          </AppText>
        </Pressable>
        <AppText className="text-muted text-base font-medium">DEV-37</AppText>
      </View>

      <AppText className="text-foreground mb-4 text-2xl font-bold">
        Modern Dialog Component with Adaptive Layouts and Accessibility
      </AppText>

      <Card
        variant="tertiary"
        className="-mx-3 mb-6 flex-row flex-wrap gap-x-2 gap-y-3 rounded-3xl border-0">
        <Status />
        <Priority />
        <Assignee />
        <Labels />
        <Project />
      </Card>

      <AppText className="text-foreground mb-6 text-base">
        Build a best-in-class dialog component that sets new standards for
        performance and user experience. The implementation should feature
        smooth animations, keyboard-aware positioning, and adaptive layouts that
        work seamlessly across all device sizes. Focus on creating an intuitive
        API that makes complex interactions feel effortless.
      </AppText>

      <Pressable onPress={simulatePress}>
        <Card className="bg-surface-tertiary mb-6 rounded-2xl border-0 p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <StyledMaterialCommunityIcons
                name="github"
                size={20}
                className="text-foreground"
              />
              <AppText className="text-foreground text-base font-semibold">
                feat/dialog-component
              </AppText>
            </View>
            <View className="flex-row items-center gap-2">
              <AppText className="text-muted text-base">#26</AppText>
              <StyledMaterialCommunityIcons
                name="source-branch"
                size={20}
                className="text-purple-400"
              />
            </View>
          </View>
        </Card>
      </Pressable>

      <Separator className="-mx-6 mb-6" />

      <View className="mb-8">
        <View className="mb-4 flex-row items-center justify-between">
          <AppText className="text-muted text-lg font-semibold">
            Activity
          </AppText>
          <View className="flex-row items-center">
            <View className="flex-row">
              <Avatar alt="volo" className="size-6 bg-purple-500">
                <Avatar.Image
                  source={{
                    uri: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/volo-avatar.png",
                  }}
                />
                <Avatar.Fallback>
                  <AppText className="text-[10px] font-bold text-white">
                    VS
                  </AppText>
                </Avatar.Fallback>
              </Avatar>
              <Avatar alt="Junior" className="-ml-3 size-6 bg-sky-500">
                <Avatar.Image
                  source={{
                    uri: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-example/junior-avatar.jpg",
                  }}
                />
                <Avatar.Fallback>
                  <AppText className="text-[10px] font-bold text-white">
                    JG
                  </AppText>
                </Avatar.Fallback>
              </Avatar>
            </View>
          </View>
        </View>

        <View>
          <View className="-mb-1.5 flex-row gap-2">
            <View className="mt-1.5 items-center">
              <View className="border-foreground/60 size-2.5 rounded-full border" />
              <View className="bg-foreground/15 h-12 w-px" />
            </View>
            <View className="flex-1">
              <AppText className="text-foreground/60 text-base">
                <AppText className="text-foreground font-semibold">
                  Junior
                </AppText>{" "}
                created the issue
              </AppText>
              <AppText className="text-foreground/35 mt-1 text-sm">
                18 September 2025 at 13:32
              </AppText>
            </View>
          </View>

          <View className="-mb-1.5 flex-row gap-2">
            <View className="mt-1.5 items-center">
              <View className="border-foreground/60 size-2.5 rounded-full border" />
              <View className="bg-foreground/15 h-12 w-px" />
            </View>
            <View className="flex-1">
              <AppText className="text-foreground/60 text-base">
                <AppText className="text-foreground font-semibold">
                  volo
                </AppText>{" "}
                changed status from{" "}
                <AppText className="text-foreground font-semibold">
                  Todo
                </AppText>{" "}
                to{" "}
                <AppText className="text-foreground font-semibold">
                  In Progress
                </AppText>
              </AppText>
            </View>
          </View>

          <View className="-mb-1.5 flex-row gap-2">
            <View className="mt-1.5 items-center">
              <View className="border-foreground/60 size-2.5 rounded-full border" />
              <View className="bg-foreground/15 h-12 w-px" />
            </View>
            <View className="flex-1">
              <AppText className="text-foreground/60 text-base">
                <AppText className="text-foreground font-semibold">
                  volo
                </AppText>{" "}
                changed status from{" "}
                <AppText className="text-foreground font-semibold">
                  In Progress
                </AppText>{" "}
                to{" "}
                <AppText className="text-foreground font-semibold">
                  In Review
                </AppText>
              </AppText>
            </View>
          </View>

          <View className="flex-row gap-2">
            <View className="mt-1.5 items-center">
              <View className="border-foreground/60 size-2.5 rounded-full border" />
            </View>
            <View className="flex-1">
              <AppText className="text-foreground/60 text-base">
                <AppText className="text-foreground font-semibold">
                  Junior
                </AppText>{" "}
                changed status from{" "}
                <AppText className="text-foreground font-semibold">
                  In Review
                </AppText>{" "}
                to{" "}
                <AppText className="text-foreground font-semibold">
                  Done
                </AppText>
              </AppText>
              <AppText className="text-foreground/35 mt-1 text-sm">
                20 September 2025 at 11:54
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </StyledAnimatedScrollView>
  );
}
