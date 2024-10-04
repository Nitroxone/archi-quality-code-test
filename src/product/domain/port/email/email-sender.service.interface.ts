export interface EmailSenderServiceInterface {
    sendMail(content: string): void;
}