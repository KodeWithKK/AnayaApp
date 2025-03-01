import React from "react";
import { Dimensions } from "react-native";
import RenderHTML from "react-native-render-html";

import { NAV_THEME } from "~/lib/constants";

interface HTMLViewerProps extends React.ComponentProps<typeof RenderHTML> {
  paddingX?: number;
}

const HTMLViewer: React.FC<HTMLViewerProps> = React.memo(
  ({ paddingX = 0, ...restProps }) => {
    const contentWidth = Dimensions.get("window").width - paddingX;

    return (
      <RenderHTML
        contentWidth={contentWidth}
        baseStyle={{
          fontFamily: "Poppins-Regular",
          color: NAV_THEME.light.mutedForeground,
          margin: 0,
          padding: 0,
        }}
        tagsStyles={{
          p: {
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
          },
          ul: {
            margin: 0,
            padding: 0,
            paddingLeft: 10,
            listStyleType: "disc",
          },
          ol: {
            margin: 0,
            padding: 0,
            paddingLeft: 10,
          },
        }}
        systemFonts={["Poppins-Regular"]}
        {...restProps}
      />
    );
  },
);

export default HTMLViewer;
