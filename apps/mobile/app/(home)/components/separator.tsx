import { View } from "react-native";
import { Separator, Surface } from "heroui-native";

import { AppText } from "../../../components/app-text";
import type { UsageVariant } from "../../../components/component-presentation/types";
import { UsageVariantFlatList } from "../../../components/component-presentation/usage-variant-flatlist";

const SeparatorInActionContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Surface variant="secondary" className="px-6 py-7">
        <AppText
          className="text-foreground text-base font-medium"
          maxFontSizeMultiplier={1.4}>
          HeroUI Native
        </AppText>
        <AppText className="text-muted text-sm" maxFontSizeMultiplier={1.4}>
          A modern React Native component library.
        </AppText>
        <Separator className="my-4" />
        <View className="h-5 flex-row items-center">
          <AppText
            className="text-foreground text-sm"
            maxFontSizeMultiplier={1.2}>
            Components
          </AppText>
          <Separator orientation="vertical" className="mx-3" />
          <AppText
            className="text-foreground text-sm"
            maxFontSizeMultiplier={1.2}>
            Themes
          </AppText>
          <Separator orientation="vertical" className="mx-3" />
          <AppText
            className="text-foreground text-sm"
            maxFontSizeMultiplier={1.2}>
            Examples
          </AppText>
        </View>
      </Surface>
    </View>
  );
};

// ------------------------------------------------------------------------------

const VariantsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-8">
        <View>
          <AppText className="text-muted mb-2 text-sm">Thin (default)</AppText>
          <Separator variant="thin" />
        </View>

        <View>
          <AppText className="text-muted mb-2 text-sm">Thick</AppText>
          <Separator variant="thick" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const OrientationContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-8">
        <View>
          <AppText className="text-muted mb-2 text-sm">
            Horizontal (default)
          </AppText>
          <Separator />
        </View>

        <View>
          <AppText className="text-muted mb-2 text-sm">Vertical</AppText>
          <View className="h-20 w-full flex-row justify-center">
            <Separator orientation="vertical" />
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomThicknessContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-8">
        <View>
          <AppText className="text-muted mb-2 text-sm">
            Default (hairline width)
          </AppText>
          <Separator />
        </View>

        <View>
          <AppText className="text-muted mb-2 text-sm">1px</AppText>
          <Separator thickness={1} />
        </View>

        <View>
          <AppText className="text-muted mb-2 text-sm">2px</AppText>
          <Separator thickness={2} />
        </View>

        <View>
          <AppText className="text-muted mb-2 text-sm">5px</AppText>
          <Separator thickness={5} />
        </View>

        <View>
          <AppText className="text-muted mb-2 text-sm">10px</AppText>
          <Separator thickness={10} />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomColorsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-8">
        <View>
          <AppText className="text-muted mb-2 text-sm">
            Custom Background Color
          </AppText>
          <Separator className="bg-accent" thickness={2} />
        </View>

        <View>
          <AppText className="text-muted mb-2 text-sm">Success Color</AppText>
          <Separator className="bg-success" thickness={2} />
        </View>

        <View>
          <AppText className="text-muted mb-2 text-sm">Warning Color</AppText>
          <Separator className="bg-warning" thickness={2} />
        </View>

        <View>
          <AppText className="text-muted mb-2 text-sm">Danger Color</AppText>
          <Separator className="bg-danger" thickness={2} />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SEPARATOR_VARIANTS: UsageVariant[] = [
  {
    value: "separator-in-action",
    label: "Separator in action",
    content: <SeparatorInActionContent />,
  },
  {
    value: "variants",
    label: "Variants",
    content: <VariantsContent />,
  },
  {
    value: "orientation",
    label: "Orientation",
    content: <OrientationContent />,
  },
  {
    value: "custom-thickness",
    label: "Custom thickness",
    content: <CustomThicknessContent />,
  },
  {
    value: "custom-colors",
    label: "Custom colors",
    content: <CustomColorsContent />,
  },
];

export default function SeparatorScreen() {
  return <UsageVariantFlatList data={SEPARATOR_VARIANTS} />;
}
