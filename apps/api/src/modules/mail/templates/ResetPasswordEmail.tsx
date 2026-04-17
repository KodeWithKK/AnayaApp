import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  url: string;
  name: string;
}

export const ResetPasswordEmail = ({ url, name }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your Anaya password</Preview>
      <Tailwind>
        <Body className="bg-slate-50 font-sans">
          <Container className="mx-auto my-10 max-w-xl rounded-lg bg-white p-10 shadow-lg">
            <Heading className="mb-8 text-center text-3xl font-bold text-slate-800">
              Reset Your Password
            </Heading>
            <Text className="text-base leading-relaxed text-slate-600">
              Hi {name},
            </Text>
            <Text className="text-base leading-relaxed text-slate-600">
              We received a request to reset your password. Click the button
              below to choose a new one:
            </Text>
            <Section className="my-8 text-center">
              <Button
                className="inline-block rounded-md bg-blue-600 px-6 py-3 text-base font-bold text-white no-underline"
                href={url}>
                Reset Password
              </Button>
            </Section>
            <Text className="text-sm text-slate-500 italic">
              If you didn't request a password reset, you can safely ignore this
              email. This link will expire shortly.
            </Text>
            <Hr className="my-6 border-slate-200" />
            <Text className="text-center text-xs font-semibold text-slate-400">
              Anaya - Premium Personal Assistant
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
