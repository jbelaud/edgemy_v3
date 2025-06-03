export interface EmailTemplate {
  subject: string;
  htmlContent: string;
  sender: {
    name: string;
    email: string;
  };
}

export interface EmailRecipient {
  email: string;
  name: string;
} 