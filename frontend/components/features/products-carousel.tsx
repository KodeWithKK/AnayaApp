import React, { useRef, useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { cn } from "~/lib/utils";

const { width: screenWidth } = Dimensions.get("window");

interface ProductCarouselProps {
  images: string[];
}

const ProductCarousel = ({ images }: ProductCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

  const handleProgressChange = (_: number, absoluteProgress: number) => {
    const index = Math.round(absoluteProgress) % images.length;
    setActiveIndex(index < 0 ? images.length + index : index);
  };

  const handleSnapToItem = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <View className="relative">
      <View className="overflow-hidden rounded-lg">
        <Carousel
          ref={carouselRef}
          width={screenWidth}
          height={screenWidth}
          data={images}
          onProgressChange={handleProgressChange}
          onSnapToItem={handleSnapToItem}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} className="aspect-square w-full" />
          )}
          loop={true}
        />
      </View>

      <View className="absolute bottom-[-30px] w-full flex-row justify-center gap-2">
        {images.map((imageUri, idx) => (
          <TouchableOpacity
            key={imageUri}
            onPress={() => {
              setActiveIndex(idx);
              carouselRef.current?.scrollTo({ index: idx });
            }}
            activeOpacity={0.75}
          >
            <Image
              source={{ uri: imageUri }}
              className={cn(
                "h-[60px] w-[60px] rounded-full border-2 border-white",
                activeIndex === idx && "border-primary/60",
              )}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ProductCarousel;
