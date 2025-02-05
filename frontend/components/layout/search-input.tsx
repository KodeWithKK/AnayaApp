import { ComponentProps } from "react";

import { View } from "~/components/core";
import { Input } from "~/components/ui/input";
import { OptionsOutlineIcon, SearchOutlineIcon } from "~/lib/icons";
import { cn } from "~/lib/utils";

interface SearchInputProps {
  inputClassname?: ComponentProps<typeof Input>["className"];
}

const SearchInput: React.FC<SearchInputProps> = ({ inputClassname }) => {
  return (
    <View className="relative">
      <Input
        placeholder="Jewellery"
        className={cn(
          "h-8 rounded-lg border-0 bg-muted pl-14 pt-1",
          inputClassname,
        )}
      />
      <View className="absolute left-3.5 top-3.5">
        <SearchOutlineIcon className="h-7 w-7 text-muted-foreground/80" />
      </View>
      <View className="absolute right-3.5 top-3.5 border-l border-border-darker pl-2.5">
        <OptionsOutlineIcon className="h-7 w-7 text-muted-foreground/80" />
      </View>
    </View>
  );
};

export default SearchInput;
