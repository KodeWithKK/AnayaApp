import * as React from "react";
import { View as RNView } from "react-native";

import * as Slot from "@rn-primitives/slot";
import type { SlottableViewProps, ViewRef } from "@rn-primitives/types";

import { cn } from "~/lib/utils";

const View = React.forwardRef<ViewRef, SlottableViewProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot.View : RNView;

    return <Component className={cn("", className)} ref={ref} {...props} />;
  },
);

export { View };
