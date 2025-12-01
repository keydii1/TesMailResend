import express from "express";
import { sendEmail } from "./email.service.js";

const app = express();

// Parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-mail", async (req, res) => {
  console.log("Request body:", req.body); // Debug log

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const result = await sendEmail(
      email,
      "Welcome to anhchang911.site - Email Verification",
      `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome! 🎉</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #333333; margin-top: 0;">Hello!</h2>
              <p style="color: #666666; line-height: 1.6; font-size: 16px;">
                Thank you for using our email service. This is a test email sent from 
                <strong style="color: #667eea;">anhchang911.site</strong>.
              </p>
              <p style="color: #666666; line-height: 1.6; font-size: 16px;">
                Our email service is powered by Resend and uses proper authentication 
                (SPF, DKIM, DMARC) to ensure reliable delivery.
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://anhchang911.site" style="display: inline-block; padding: 14px 40px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                      Visit Our Website
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #999999; font-size: 14px; line-height: 1.6;">
                If you didn't request this email, you can safely ignore it.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #999999; font-size: 12px; margin: 5px 0;">
                © 2025 anhchang911.site. All rights reserved.
              </p>
              <p style="color: #999999; font-size: 12px; margin: 5px 0;">
                This email was sent from a verified domain.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `
    );

    console.log("Email sent successfully:", result);
    res.json({ message: "Email sent successfully!", data: result });
  } catch (err) {
    console.error("Error sending email:", err);
    res
      .status(500)
      .json({ error: "Failed to send email", details: err.message });
  }
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Email API is running!",
    endpoints: {
      sendMail: "POST /send-mail",
    },
  });
});

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
