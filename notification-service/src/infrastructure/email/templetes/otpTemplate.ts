export const createOtpTemplate = (message: string): string => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
    <h2 style="color: #333;">Your One-Time Password (OTP)</h2>
    <p style="font-size: 16px; color: #555;">Hello,</p>
    <p style="font-size: 16px; color: #555;">Use the following OTP to complete your verification:</p>
    <div style="text-align: center; font-size: 24px; margin: 20px 0; padding: 10px; background-color: #f7f7f7; border-radius: 5px; border: 1px solid #ccc;">
      <strong>${message}</strong>
    </div>
    <p style="font-size: 16px; color: #555;">This OTP is valid for the next 10 minutes.</p>
    <p style="font-size: 16px; color: #555;">If you did not request this OTP, please ignore this email.</p>
    <p style="font-size: 16px; color: #555;">Best regards,<br />LearnVoyage</p>
  </div>
`;
