import * as React from "react";
import { Button, Heading, Section, Text } from "@react-email/components";

import { EmailLayout } from "./EmailLayout";

interface ResetPasswordEmailProps {
  url: string;
  name: string;
}

export const ResetPasswordEmail = ({ url, name }: ResetPasswordEmailProps) => {
  return (
    <EmailLayout previewText="Secure access to your Anaya account">
      <Heading className="mb-6 text-center text-2xl font-bold tracking-tight text-gray-900">
        Reset Your Password
      </Heading>

      <Text className="text-base leading-7 text-gray-600">
        Dear <span className="font-semibold text-gray-900">{name}</span>,
      </Text>

      <Text className="mb-8 text-base leading-7 text-gray-600">
        We received a request to update the security of your account. To choose
        a new password and regain access to your curated wardrobe, please follow
        the link below:
      </Text>

      <Section className="my-10 text-center">
        <Button
          className="rounded-full bg-black px-10 py-4 text-sm font-bold text-white no-underline shadow-xl"
          href={url}>
          SECURE RESET
        </Button>
      </Section>

      <Text className="m-0 mt-12 text-center text-sm text-gray-400 italic">
        If you {"didn't"} request a password reset, you can safely ignore this
        email. This link will expire shortly for your security.
      </Text>
    </EmailLayout>
  );
};
