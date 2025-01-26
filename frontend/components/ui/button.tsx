import * as React from "react";
import { TouchableHighlight } from "react-native";
import { cva, type VariantProps } from "class-variance-authority";

import { useColorScheme } from "~/lib/useColorScheme";
import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "group flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary active:opacity-90",
        destructive: "bg-destructive web:hover:opacity-90 active:opacity-90",
        outline:
          "border border-input bg-background web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        secondary: "bg-secondary web:hover:opacity-80 active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline ",
      },
      size: {
        default:
          "h-10 px-4 py-2  native:h-16 rounded-2xl native:px-5 native:py-3",
        sm: "rounded-md py-1.5 px-3",
        lg: "h-11 rounded-md px-8 native:h-14",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableHighlight>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<
  React.ElementRef<typeof TouchableHighlight>,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => {
  const { colors } = useColorScheme();

  return (
    <TouchableHighlight
      activeOpacity={0.75}
      underlayColor={variant == "default" ? colors.primary : "transparent"}
      className={cn(
        props.disabled && "opacity-50",
        buttonVariants({ variant, size, className }),
      )}
      ref={ref}
      role="button"
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
