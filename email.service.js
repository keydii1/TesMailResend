import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

// Read API key from environment for security
const RESEND_API_KEY = process.env.RESEND_API_KEY;

let resendClient = null;
if (RESEND_API_KEY) {
  resendClient = new Resend(RESEND_API_KEY);
}

/**
 * Send an email using Resend.
 * @param {string} to - recipient email
 * @param {string} subject - message subject
 * @param {string} html - html body
 */
export async function sendEmail(to, subject, html) {
  if (!RESEND_API_KEY || !resendClient) {
    throw new Error("RESEND_API_KEY is not set in environment variables");
  }

  return resendClient.emails.send({
    from: `anhchang911 <${process.env.FROM_EMAIL || "onboarding@resend.dev"}>`,
    to,
    subject,
    html,
    // Add headers to improve deliverability
    headers: {
      "X-Entity-Ref-ID": `${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
    },
    // Add tags for tracking
    tags: [
      {
        name: "category",
        value: "transactional",
      },
    ],
  });
}
