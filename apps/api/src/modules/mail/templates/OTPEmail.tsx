import { Heading, Section, Text } from "@react-email/components";

import { EmailLayout } from "./EmailLayout";

interface OTPEmailProps {
  otp: string;
  name: string;
}

export const OTPEmail = ({ otp, name }: OTPEmailProps) => {
  return (
    <EmailLayout previewText="Your Anaya Verification Code">
      <Heading className="mb-6 text-center text-xl font-bold tracking-tight text-gray-900">
        Verify Your Identity
      </Heading>

      <Text className="text-base leading-7 text-gray-600">
        Hi <span className="font-semibold text-gray-900">{name}</span>,
      </Text>

      <Text className="mb-8 text-base leading-7 text-gray-600">
        To complete your sign-in to Anaya, please use the following one-time
        verification code. For your security, this code remains valid for only
        10 minutes.
      </Text>

      <Section className="my-10 rounded-xl border border-gray-100 bg-gray-50 p-8 text-center">
        <Text className="m-0 font-mono text-4xl font-bold tracking-[0.5em] text-black">
          {otp}
        </Text>
      </Section>

      <Text className="mt-12 text-center text-sm text-gray-400 italic">
        Never share this code with anyone. Anaya representatives will never ask
        for your verification code.
      </Text>
    </EmailLayout>
  );
};
