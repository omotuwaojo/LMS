const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
const AppError = require('./ApiError');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `LMS Admin <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject, variables = {}) {
    try {
      // 1) Render HTML based on a pug template
      const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
        firstName: this.firstName,
        url: this.url,
        subject,
        ...variables
      });

      // 2) Define email options
      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        html,
        text: htmlToText.fromString(html)
      };

      // 3) Create transport and send email
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      throw new AppError('There was an error sending the email. Try again later!', 500);
    }
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the LMS Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  async sendEmailVerification() {
    await this.send(
      'emailVerification',
      'Verify your email address'
    );
  }
};