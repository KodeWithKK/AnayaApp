import { ComponentProps, useState } from "react";

import { Text } from "~/components/core";
import { cn } from "~/lib/utils";

interface ExpandableTextProps extends ComponentProps<typeof Text> {
  children: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  children,
  className,
  ...restProps
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <Text className={cn("text-muted-foreground", className)} {...restProps}>
      {children
        .split(" ")
        .slice(0, showFullDescription ? 1000 : 18)
        .join(" ")}
      {showFullDescription ? " " : "... "}
      <Text
        onPress={() => setShowFullDescription((prev) => !prev)}
        className="text-primary"
      >
        Read {showFullDescription ? "less" : "more"}
      </Text>
    </Text>
  );
};

export default ExpandableText;
