const nodemailer = require("nodemailer");

module.exports = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: `${process.env.SMTP_NAME} <${process.env.SMTP_MAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};
