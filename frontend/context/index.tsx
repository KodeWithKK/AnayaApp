import AppProvider from "./app-provider";
import ReactQueryProvider from "./react-query-provider";
import RootProvider from "./root-provider";
import ToastProvider from "./toast-provider";

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
