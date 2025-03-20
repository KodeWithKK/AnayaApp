import { ComponentProps } from "react";

import { View } from "~/components/core";
import { Input } from "~/components/ui/input";
import { IconOptions, IconSearch } from "~/lib/icons";
import { cn } from "~/lib/utils";

interface SearchInputProps {
  inputClassname?: ComponentProps<typeof Input>["className"];
}

const SearchInput: React.FC<SearchInputProps> = ({ inputClassname }) => {
  return (
    <View className="relative">
      <Input
        placeholder="Search..."
        className={cn(
          "h-8 rounded-lg border-0 bg-muted pl-14 pt-1",
          inputClassname,
        )}
      />
      <View className="absolute left-3.5 top-3.5">
        <IconSearch className="h-7 w-7 text-muted-foreground" />
      </View>
      <View className="absolute right-3.5 top-3.5 border-l border-muted-foreground/40 pl-2.5">
        <IconOptions className="h-7 w-7 text-muted-foreground" />
      </View>
    </View>
  );
};

export default SearchInput;
