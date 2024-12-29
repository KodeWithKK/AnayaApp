import { Text } from "~/components/core";

interface FormLabelProps {
  children: React.ReactNode;
}

const FormLabel = ({ children }: Readonly<FormLabelProps>) => {
  if (!children) return;
  return <Text className="text-muted-foreground">{children}</Text>;
};

export default FormLabel;
