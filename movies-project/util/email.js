const pug = require('pug');
const { htmlToText } = require('html-to-text');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

class Email {
  constructor(emails) {
    this.emails = emails;
    this.from = `Max Rangel <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });
  }

  async send() {
    const html = pug.renderFile(`${__dirname}/../emails/baseEmail.pug`);

    await this.newTransport().sendMail({
      from: this.from,
      to: this.emails,
      html: htmlToText(html),
      subject: 'This is a test email'
    });
  }
}

module.exports = { Email };
