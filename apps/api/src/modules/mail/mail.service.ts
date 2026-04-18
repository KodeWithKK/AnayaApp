import { Injectable, Logger } from "@nestjs/common";
import { render } from "@react-email/render";
import * as nodemailer from "nodemailer";

import { envConfig } from "@/config/env.config";
import { OTPEmail } from "./templates/OTPEmail";
import { ResetPasswordEmail } from "./templates/ResetPasswordEmail";

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: envConfig.smtpHost,
      port: envConfig.smtpPort,
      secure: false,
      auth: {
        user: envConfig.smtpUser,
        pass: envConfig.smtpPass,
      },
    });
  }

  async sendResetPasswordEmail(
    to: string,
    name: string,
    url: string,
  ): Promise<void> {
    try {
      const emailHtml = await render(ResetPasswordEmail({ url, name }));

      const mailOptions = {
        from: envConfig.smtpFrom,
        to,
        subject: "Reset your Anaya password",
        html: emailHtml,
      };

      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Reset password email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send reset password email to ${to}`, error);
      throw error;
    }
  }

  async sendOTPEmail(to: string, name: string, otp: string): Promise<void> {
    try {
      const emailHtml = await render(OTPEmail({ otp, name }));

      const mailOptions = {
        from: envConfig.smtpFrom,
        to,
        subject: `${otp} is your Anaya verification code`,
        html: emailHtml,
      };

      await this.transporter.sendMail(mailOptions);
      this.logger.log(`OTP email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send OTP email to ${to}`, error);
      throw error;
    }
  }
}
