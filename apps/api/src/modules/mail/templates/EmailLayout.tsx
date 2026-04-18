import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface EmailLayoutProps {
  children: React.ReactNode;
  previewText: string;
}

export const EmailLayout = ({ children, previewText }: EmailLayoutProps) => {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-[#f8f9fa] px-4 py-12 font-sans">
          <Container className="mx-auto max-w-[580px] rounded-2xl bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <Section className="mb-8 text-center">
              <Text className="m-0 text-3xl font-extrabold text-black">
                Anaya
              </Text>
              <Text className="m-0 text-sm tracking-[0.3em] text-gray-400 uppercase">
                Luxury Fashion
              </Text>
            </Section>

            <Hr className="my-8 border-gray-100" />

            {children}

            <Hr className="my-10 border-gray-100" />

            <Section className="text-center">
              <Text className="mb-2 text-xs font-bold tracking-widest text-gray-600 uppercase">
                Anaya Global
              </Text>
              <Text className="text-xs leading-relaxed tracking-wider text-gray-400 uppercase">
                Luxury Fashion & Curated Lifestyle
                <br />
                Paris • Milan • London • New York
              </Text>
            </Section>
          </Container>

          <Section className="mx-auto mt-8 max-w-[580px] px-4 text-center">
            <Text className="m-0 text-xs tracking-widest text-gray-400 uppercase no-underline">
              © 2026 Anaya Global Inc. All rights reserved.
            </Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};
