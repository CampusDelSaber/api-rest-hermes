import nodemailer from 'nodemailer';
import fs from 'fs';

/**
 * Configure Nodemailer with your email service details
 * @type {import('nodemailer').Transporter}
 */
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: 'hermes.info.app@gmail.com',
      pass: 'acqaasdvtfjqzqnj'
    }
});

/**
 * Sends an email with the provided details.
 * 
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @returns {Promise<void>} A promise that resolves once the email is sent.
 */
export const sendEmail = async (req, res) => {
  const { to, code } = req.query;
    const mailOptions = {
      from: 'hermes.info.app@gmail.com',
      to: to,
      subject: `Hermes email verification code: ` + code,
      html: await getHtml('resources/verifyEmail.html', code)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email' + error);
    } else {
      res.set('Content-Type', 'text/html');
      res.send('Email sent successfully');
    }
  });

  /**
 * Reads the contents of an HTML file from the specified path.
 *
 * @param {string} route - The path to the HTML file.
 * @param {string} codeEmail - The code to replace the placeholder with.
 * @returns {Promise<string>} A promise that resolves with the modified HTML content.
 */
  function getHtml(route, codeEmail) {
    return new Promise((resolve, reject) => {
      fs.readFile(route, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          let contentData = data;
          let htmlString = contentData.replace("codeToRemplace", codeEmail);
          resolve(htmlString);
        }
      });
    });
  }
}
