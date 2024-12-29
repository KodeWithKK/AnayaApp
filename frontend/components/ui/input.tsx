import * as React from "react";
import { TextInput, type TextInputProps } from "react-native";

import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps
>(({ className, placeholderClassName, ...props }, ref) => {
  const { colors } = useColorScheme();

  return (
    <TextInput
      ref={ref}
      className={cn(
        "native:h-[48px] native:text-lg native:leading-[1.25] native:focus:border-ring native:placeholder:text-muted-foreground/50 h-10 rounded-2xl border-2 border-input bg-background px-4 font-regular text-base text-foreground file:border-0 file:bg-transparent file:font-medium web:flex web:w-full web:py-2 web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm",
        props.editable === false && "opacity-50 web:cursor-not-allowed",
        className,
      )}
      placeholderClassName={placeholderClassName}
      cursorColor={colors.text}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
