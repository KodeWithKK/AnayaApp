import { Button, Heading, Section, Text } from "@react-email/components";

import { EmailLayout } from "./EmailLayout";

interface ResetPasswordEmailProps {
  url: string;
  name: string;
}

export const ResetPasswordEmail = ({ url, name }: ResetPasswordEmailProps) => {
  return (
    <EmailLayout previewText="Secure access to your Anaya account">
      <Heading className="mb-6 text-center text-xl font-bold tracking-tight text-gray-900">
        Reset Your Password
      </Heading>

      <Text className="text-base leading-7 text-gray-600">
        Hi <span className="font-semibold text-gray-900">{name}</span>,
      </Text>

      <Text className="mb-8 text-base leading-7 text-gray-600">
        To choose a new password and regain access to your Anaya account, please
        use the secure link below.
      </Text>

      <Button
        className="mt-8 block w-full rounded-md bg-[#39D3FF] py-4 text-center text-sm font-bold text-black no-underline"
        href={url}
        style={{ display: "block", width: "100%", backgroundColor: "#39D3FF" }}>
        Reset Password
      </Button>

      <Text className="mt-12 text-center text-sm text-gray-400 italic">
        If you {"didn't"} request a password reset, you can safely ignore this
        email. This link will expire shortly for your security.
      </Text>
    </EmailLayout>
  );
};
