export const createOfferTemplate = (message: string): string => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
    <h2 style="color: #333;">Special Offer!</h2>
    <p style="font-size: 16px; color: #555;">Hello,</p>
    <p style="font-size: 16px; color: #555;">${message}</p>
    <p style="font-size: 16px; color: #555;">Best regards,<br />LearnVoyage</p>
  </div>
`;
