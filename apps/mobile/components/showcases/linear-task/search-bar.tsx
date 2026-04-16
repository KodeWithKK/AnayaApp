import { type FC } from "react";
import { TextInput, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useThemeColor } from "heroui-native";
import { withUniwind } from "uniwind";

const StyledFontAwesome = withUniwind(FontAwesome);

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
}) => {
  const themeColorMuted = useThemeColor("muted");

  return (
    <View className="bg-surface-secondary mb-2 h-12 flex-row items-center gap-2 rounded-xl px-3">
      <StyledFontAwesome name="search" size={14} className="text-muted" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={themeColorMuted}
        selectionColor={themeColorMuted}
        className="text-foreground flex-1 font-medium"
        autoFocus
      />
    </View>
  );
};
