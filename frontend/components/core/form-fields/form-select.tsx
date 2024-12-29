import { useState } from "react";
import { FlatList } from "react-native";

import { Control, FieldValues, Path, useController } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View } from "~/components/core";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

import FormErrorMessage from "./form-error-message";
import FormLabel from "./form-label";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  defaultValue?: Option;
  options: Option[];
}

const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  defaultValue,
  options,
}: FormSelectProps<T>) => {
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 16 - 2,
    right: 16 - 2,
  };

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: defaultValue?.["value"] as any,
  });

  return (
    <View className="gap-2">
      <FormLabel>{label}</FormLabel>

      <Select
        defaultValue={defaultValue}
        onOpenChange={setIsOpen}
        onValueChange={(option) => onChange(option?.value)}
      >
        <SelectTrigger
          className={cn(
            "w-full rounded-2xl border-2",
            isOpen && "border-primary",
          )}
        >
          <SelectValue
            className={cn(
              "native:text-lg font-regular text-sm text-foreground",
              !value && "text-muted-foreground/50",
            )}
            placeholder="Select a fruit"
          />
        </SelectTrigger>

        <SelectContent
          insets={contentInsets}
          className={cn(
            "mt-1 w-full rounded-2xl border-2",
            // isOpen && "border-primary",
          )}
        >
          <SelectGroup>
            <FlatList
              data={options}
              keyExtractor={(option) => option.value}
              renderItem={({ item }) => (
                <SelectItem label={item.label} value={item.value} />
              )}
            />
          </SelectGroup>
        </SelectContent>
      </Select>

      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </View>
  );
};

export default FormSelect;
