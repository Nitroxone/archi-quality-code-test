import { EmailSenderServiceInterface } from "src/product/domain/port/email/email-sender.service.interface";

export class EmailSenderService implements EmailSenderServiceInterface {
    sendMail(content: string): void {
        // imagination is the greatest gift of Man. you may use your imagination here.
        console.log(content);
        return;
    }
}