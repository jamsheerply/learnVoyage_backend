export interface Notification {
  id: string;
  recipientEmail: string;
  subject: string;
  message: string;
  type: string; // Add a type to distinguish between different email templates
}
