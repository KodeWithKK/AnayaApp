import { Image, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Card, cn, type CardRootProps } from "heroui-native";
import { withUniwind } from "uniwind";

import { AppText } from "../../../components/app-text";
import type { UsageVariant } from "../../../components/component-presentation/types";
import { UsageVariantFlatList } from "../../../components/component-presentation/usage-variant-flatlist";

const StyledImage = withUniwind(Image);
const StyledIonicons = withUniwind(Ionicons);

const BasicCardContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card>
        <View className="gap-4">
          <Card.Body className="mb-4">
            <View className="mb-2 gap-1">
              <Card.Title className="text-pink-400">$450</Card.Title>
              <Card.Title>Living room Sofa</Card.Title>
            </View>
            <Card.Description>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces.
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <Button variant="primary">Buy now</Button>
            <Button variant="ghost">
              <Button.Label>Add to cart</Button.Label>
              <StyledIonicons
                name="basket-outline"
                size={16}
                className="text-muted"
              />
            </Button>
          </Card.Footer>
        </View>
      </Card>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CardWithImageContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="flex-row gap-4">
        <Card className="aspect-[1/1.3] flex-1">
          <View className="flex-1 gap-4">
            <Card.Header>
              <StyledImage
                source={{
                  uri: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg",
                }}
                className="aspect-square h-16 rounded-xl"
              />
            </Card.Header>
            <Card.Body className="flex-1">
              <Card.Title maxFontSizeMultiplier={1.2} numberOfLines={1}>
                Indie Hackers
              </Card.Title>
              <Card.Description
                className="text-sm"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}>
                148 members
              </Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="size-3 rounded-full bg-rose-400" />
              <AppText
                className="text-foreground text-sm font-medium"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}>
                @indiehackers
              </AppText>
            </Card.Footer>
          </View>
        </Card>
        <Card className="aspect-[1/1.3] flex-1">
          <View className="flex-1 gap-4">
            <Card.Header>
              <StyledImage
                source={{
                  uri: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg",
                }}
                className="aspect-square h-16 rounded-xl"
              />
            </Card.Header>
            <Card.Body className="flex-1">
              <Card.Title maxFontSizeMultiplier={1.2} numberOfLines={1}>
                AI Builders
              </Card.Title>
              <Card.Description
                className="text-sm"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}>
                362 members
              </Card.Description>
            </Card.Body>
            <Card.Footer className="flex-row items-center gap-2">
              <View className="size-3 rounded-full bg-emerald-400" />
              <AppText
                className="text-foreground text-sm font-medium"
                maxFontSizeMultiplier={1.2}
                numberOfLines={1}>
                @aibuilders
              </AppText>
            </Card.Footer>
          </View>
        </Card>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const HorizontalCardWithImageContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="w-full gap-4">
        <Card className="flex-row gap-4 p-4" variant="tertiary">
          <StyledImage
            source={{
              uri: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg",
            }}
            className="aspect-square h-28 rounded-2xl"
            resizeMode="cover"
          />
          <View className="flex-1 gap-4">
            <Card.Body className="flex-1">
              <Card.Title maxFontSizeMultiplier={1.2} numberOfLines={1}>
                Avocado Hackathon
              </Card.Title>
              <Card.Description
                numberOfLines={2}
                className="text-sm"
                maxFontSizeMultiplier={1.2}>
                Today, 6:30 PM
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Pressable className="flex-row items-center gap-1">
                <AppText
                  className="text-accent text-sm font-medium"
                  maxFontSizeMultiplier={1.2}
                  numberOfLines={1}>
                  View Details
                </AppText>
                <StyledIonicons
                  name="open-outline"
                  size={12}
                  className="text-accent"
                />
              </Pressable>
            </Card.Footer>
          </View>
        </Card>
        <Card className="flex-row gap-4 p-4" variant="tertiary">
          <StyledImage
            source={{
              uri: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg",
            }}
            className="aspect-square h-28 rounded-2xl"
            resizeMode="cover"
          />
          <View className="flex-1 gap-4">
            <Card.Body className="flex-1">
              <Card.Title maxFontSizeMultiplier={1.2} numberOfLines={1}>
                Sound Electro
              </Card.Title>
              <Card.Description
                numberOfLines={2}
                className="text-sm"
                maxFontSizeMultiplier={1.2}>
                Wed, 4:30 PM
              </Card.Description>
            </Card.Body>
            <Card.Footer>
              <Pressable className="flex-row items-center gap-1">
                <AppText
                  className="text-accent text-sm font-medium"
                  maxFontSizeMultiplier={1.2}
                  numberOfLines={1}>
                  View Details
                </AppText>
                <StyledIonicons
                  name="open-outline"
                  size={12}
                  className="text-accent"
                />
              </Pressable>
            </Card.Footer>
          </View>
        </Card>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const BackgroundImageCardContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Card className="aspect-square w-full">
        <Image
          source={{
            uri: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo2.jpeg",
          }}
          className="absolute inset-0"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.5)"]}
          style={StyleSheet.absoluteFill}
        />
        <View className="flex-1 gap-4">
          <Card.Body className="flex-1">
            <Card.Title
              className="mb-0.5 text-base text-zinc-50 uppercase"
              maxFontSizeMultiplier={1.2}>
              Neo
            </Card.Title>
            <Card.Description
              className="text-base font-medium text-zinc-50"
              maxFontSizeMultiplier={1.2}>
              Home robot
            </Card.Description>
          </Card.Body>
          <Card.Footer className="gap-3">
            <View className="flex-row items-center justify-between">
              <View>
                <AppText
                  className="text-base text-white"
                  maxFontSizeMultiplier={1.2}>
                  Available soon
                </AppText>
                <AppText
                  className="text-base text-zinc-300"
                  maxFontSizeMultiplier={1.2}>
                  Get notified
                </AppText>
              </View>
              <Button size="sm" className="bg-white" feedbackVariant="scale">
                <Button.Label
                  className="text-black"
                  maxFontSizeMultiplier={1.2}>
                  Notify me
                </Button.Label>
              </Button>
            </View>
          </Card.Footer>
        </View>
      </Card>
    </View>
  );
};

// ------------------------------------------------------------------------------

type CardItemProps = {
  variant: CardRootProps["variant"];
  title: string;
  description: string;
  className?: string;
};

const CardItem = ({
  variant,
  title,
  description,
  className,
}: CardItemProps) => {
  return (
    <Card variant={variant} className={cn("gap-2", className)}>
      <AppText
        className="text-foreground font-medium"
        maxFontSizeMultiplier={1.3}>
        {title}
      </AppText>
      <AppText className="text-muted" maxFontSizeMultiplier={1.3}>
        {description}
      </AppText>
    </Card>
  );
};

const VariantsContent = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="w-full gap-2 px-5">
        <CardItem
          variant="default"
          title="Default"
          description="Standard card appearance (surface-secondary). The default card variant for most use cases"
        />
        <CardItem
          variant="secondary"
          title="Secondary"
          description="Medium prominence (surface-tertiary). Use to draw moderate attention."
        />
        <CardItem
          variant="tertiary"
          title="Tertiary"
          description="Higher prominence (surface-tertiary). Use for important content."
        />
        <CardItem
          variant="transparent"
          title="Transparent"
          description="Minimal prominence with transparent background. Use for less important content or nested cards."
          className="border-border border shadow-none"
        />
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CARD_VARIANTS: UsageVariant[] = [
  {
    value: "basic-card",
    label: "Basic card",
    content: <BasicCardContent />,
  },
  {
    value: "card-with-image",
    label: "Card with image",
    content: <CardWithImageContent />,
  },
  {
    value: "horizontal-card-with-image",
    label: "Horizontal card with image",
    content: <HorizontalCardWithImageContent />,
  },
  {
    value: "background-image-card",
    label: "Background image card",
    content: <BackgroundImageCardContent />,
  },
  {
    value: "variants",
    label: "Variants",
    content: <VariantsContent />,
  },
];

export default function CardScreen() {
  return <UsageVariantFlatList data={CARD_VARIANTS} />;
}
