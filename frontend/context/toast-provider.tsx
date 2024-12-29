import { createContext, useContext, useMemo, useState } from "react";

import ToastContainer, {
  IToast,
  ToastOptions,
} from "~/components/core/toast-container";

interface IToastContext {
  toast: {
    success: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
  };
}

const ToastContext = createContext<null | IToastContext>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = (
    type: IToast["type"],
    message: string,
    options?: ToastOptions,
  ) => {
    const id = Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type, options }]);
  };

  const toast = useMemo(
    () => ({
      success: (message: string, options?: ToastOptions) => {
        addToast("success", message, options);
      },
      warning: (message: string, options?: ToastOptions) => {
        addToast("warning", message, options);
      },
      info: (message: string, options?: ToastOptions) => {
        addToast("info", message, options);
      },
      error: (message: string, options?: ToastOptions) => {
        addToast("error", message, options);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} handeRemoveToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  return useContext(ToastContext) as IToastContext;
};

export default ToastProvider;
