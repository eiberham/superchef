export interface Email {
  name: string;
  to: string;
  subject: string;
  body: string;
}

export interface UserRegisteredPayload {
  data: Email;
}
