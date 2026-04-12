import { Text } from "..";

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: Readonly<ErrorMessageProps>) => {
  if (!children) return;

  return <Text className="text-destructive">{children}</Text>;
};

export default ErrorMessage;
