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
      html,
      text: htmlToText(html),
      subject: 'This is a test email'
    });
  }
}

module.exports = { Email };

// carts
// id userId status
// 1   1     purchased
// 2   2     active
// 3   1     purchased

// productsInCart
// id cartId productId quantity status
// 1   1     1           4      purchased
// 2   1     2           2      purchased
// 3   1     3           10     purchased
// 4   3     10          10     purchased
// 5   3     5          1      purchased
// 6   3     8           0     removed

// products
// id title price  qty
// 8  Book   10     10
// 5  Book 2  5   4

// { id: 8, newQty: 0 }
