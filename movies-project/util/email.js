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

  async send(template, subject, emailData) {
    const html = pug.renderFile(
      `${__dirname}/../emails/${template}.pug`,
      emailData
    );

    await this.newTransport().sendMail({
      from: this.from,
      to: this.emails,
      html,
      text: htmlToText(html),
      subject
    });
  }

  async sendWelcome(username) {
    await this.send('welcome', 'Welcome to Academlo Movies', { username });
  }

  async sendNewMovie(newMovie) {
    await this.send('newMovie', 'We have a new movie for you!', { newMovie });
  }
}

module.exports = { Email };
