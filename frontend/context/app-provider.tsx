import { createContext, useContext } from "react";

interface IAppContext {}

const AppContext = createContext<IAppContext | null>(null);

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return <AppContext.Provider value={null}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext) as IAppContext;
};

export default AppProvider;
