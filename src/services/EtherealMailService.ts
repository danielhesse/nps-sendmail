import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

interface IRequest {
  to: {
    name?: string;
    email: string;
  }
  subject: string;
  variables: object;
  path: string;
}

class EtherealMailService {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        },
      });

      this.client = transporter;
    });
  }

  async execute({ to, subject, variables, path }: IRequest): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf8");

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      from: "NPS <noreplay@nps.com.br>",
      to: {
        name: to?.name,
        address: to.email,
      },
      subject,
      html,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default new EtherealMailService();
