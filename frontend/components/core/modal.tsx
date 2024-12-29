import { Pressable, TouchableOpacity } from "react-native";

import { Portal } from "@rn-primitives/portal";
import { XIcon } from "lucide-react-native";

import { Text, View } from "~/components/core";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <Portal name="modal-portal">
      <Pressable
        onPress={onClose}
        className="absolute inset-0 h-full w-full items-center justify-center bg-black/80 backdrop-blur-md"
      >
        <View className="w-[92%] rounded-lg border-2 border-border bg-background p-5 shadow-lg">
          {title && (
            <Text className="mb-3 w-[88%] font-semibold text-[20px] text-foreground">
              {title}
            </Text>
          )}
          <TouchableOpacity
            className="absolute right-3 top-3 rounded-full border-2 border-border p-2"
            onPress={onClose}
          >
            <XIcon className="h-5 w-5 text-muted-foreground" strokeWidth={2} />
          </TouchableOpacity>
          <View>{children}</View>
        </View>
      </Pressable>
    </Portal>
  );
};

export default Modal;
