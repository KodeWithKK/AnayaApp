import { LogBox } from "react-native";

import AppProvider from "./app-provider";
import ReactQueryProvider from "./react-query-provider";
import RootProvider from "./root-provider";
import ToastProvider from "./toast-provider";

LogBox.ignoreLogs([/Support for defaultProps will be removed/]);

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootProvider>
      <AppProvider>
        <ReactQueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </ReactQueryProvider>
      </AppProvider>
    </RootProvider>
  );
};

export default ContextProviders;
