import { Portal } from "@rn-primitives/portal";
import { SafeAreaView } from "react-native-safe-area-context";

import Toast from "./toast";

export interface ToastOptions {
  autoRemove?: boolean;
}

export interface IToast {
  id: string;
  message: string;
  type: "success" | "error" | "warning" | "info";
  options?: ToastOptions;
}

interface ToastContainerProps {
  toasts: IToast[];
  handeRemoveToast: (id: string) => void;
}

const ToastContainer = ({ toasts, handeRemoveToast }: ToastContainerProps) => {
  return (
    <Portal name="toast-portal">
      <SafeAreaView className="absolute left-5 right-5 top-5 z-50 gap-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            options={toast?.options}
            onRemove={() => handeRemoveToast(toast.id)}
          />
        ))}
      </SafeAreaView>
    </Portal>
  );
};

export default ToastContainer;
