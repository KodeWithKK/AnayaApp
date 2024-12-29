import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { SvgProps } from "react-native-svg";

export function iconWithClassName(Icon: LucideIcon | React.FC<SvgProps>) {
  cssInterop(Icon, {
    className: {
      target: "style", // Map className -> style
      nativeStyleToProp: {
        height: true, // Maps Tailwind height styles to height prop
        width: true, // Maps Tailwind width styles to width prop
        color: "color", // Extract color styles and map to the `color` prop of the SVG
        opacity: true, // Maps opacity styles to opacity prop
      },
    },
  });
}
