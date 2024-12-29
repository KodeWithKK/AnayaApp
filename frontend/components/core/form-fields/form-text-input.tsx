import { TextInputProps } from "react-native";

import { Control, FieldValues, Path, useController } from "react-hook-form";

import { View } from "..";
import { Input } from "../../ui/input";
import FormErrorMessage from "./form-error-message";
import FormLabel from "./form-label";

interface FormTextInputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}

const FormTextInput = <T extends FieldValues>({
  name,
  control,
  label,
  ...restProps
}: FormTextInputProps<T>) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <View className="gap-2">
      <FormLabel>{label}</FormLabel>

      <Input
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        {...restProps}
      />

      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </View>
  );
};

export default FormTextInput;
