import { StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

import { NAV_THEME } from "~/lib/constants";

const styles = StyleSheet.create({
  heading1: {
    fontSize: 32,
    color: NAV_THEME.light.text,
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
  text: {
    color: NAV_THEME.light.mutedForeground,
  },
});

interface MarkdownViewerProps extends React.ComponentProps<typeof Markdown> {
  children: React.ReactNode;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ children }) => {
  return <Markdown style={styles}>{children}</Markdown>;
};

export default MarkdownViewer;
