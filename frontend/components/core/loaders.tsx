import { View } from "~/components/core";
import { LoaderIcon } from "~/lib/icons";
import { cn } from "~/lib/utils";

interface InlineLoaderProps {
  className?: string;
  loaderClass?: string;
}

export const InlineLoader = ({ className, loaderClass }: InlineLoaderProps) => {
  return (
    <View className={cn("animate-spin self-center duration-500", className)}>
      <LoaderIcon className={cn("h-8 w-8 text-white", loaderClass)} />
    </View>
  );
};

export const FullPageLoader = () => {
  return (
    <View className="h-full w-full items-center justify-center">
      <View className="relative -translate-y-1/2">
        <InlineLoader loaderClass="h-8 w-8" />
      </View>
    </View>
  );
};
