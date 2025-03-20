import { cssInterop } from "nativewind";

import { IconFC } from ".";

export function iconWithClassName(Icon: IconFC) {
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
