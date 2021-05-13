/**
 * Mailer Utilities
 */
const { createTransport } = require("nodemailer");
// import {fetchMailer} from '../models/preferences.model';
const sendgridTransport = require("nodemailer-sendgrid-transport");
async function fetchMailer() {
  return {
    email: process.env.EMAIL, //enter your email id
    password: process.env.PASSWORD,
    host: "smtp.gmail.com",
    port: 465,
    alias: "Unnat Technical Club",
  };
}

/**
 *
 * @param {String} to Email id of user
 * @param {String} subject Subject of email
 * @param {String} template Pug template
 * @param {Object} data Object
 * @returns {void}
 */
exports.send = async (to, subject, template, data) => {
  try {
    console.log("initiating sender");
    let sender = await fetchMailer();
    if (sender) {
      let transporter = createTransport(
        sendgridTransport({
          host: sender.host,
          secure: true, // true for 465, false for other ports
          auth: {
            api_key: process.env.EMAIL_API_KEY,
          },
        })
      );
      let html = template;
      let mailOptions = {
        from: `"${sender.alias}" ${sender.email}`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: html, // html body
      };
      let info = await transporter.sendMail(mailOptions);
      await transporter.close();
      return console.log("Message sent: %s", info.message);
    } else throw "Cannot send email : No mailer found";
  } catch (e) {
    return console.log(e);
  }
};

exports.sendToClubEmail = async ( subject, template, data) => {
  try {
    const to="techclubreck@gmail.com";
    console.log("initiating sender");
    let sender = await fetchMailer();
    if (sender) {
      let transporter = createTransport(
        sendgridTransport({
          host: sender.host,
          secure: true, // true for 465, false for other ports
          auth: {
            api_key: process.env.EMAIL_API_KEY,
          },
        })
      );
      let html = `<span>${data.fullName} Want to Contact with our club his email is ${data.email}</span><br/>
                   <b>Message :</b>
                   <p>${data.message}</p>`;
      let mailOptions = {
        from: `"${sender.alias}" ${sender.email}`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: html, // html body
      };
      let info = await transporter.sendMail(mailOptions);
      await transporter.close();
      return console.log("Message sent: %s", info.message);
    } else throw "Cannot send email : No mailer found";
  } catch (e) {
    return console.log(e);
  }
};


exports.sendQrCode = async (to, subject, template, doc) => {
  try {
    // let inlineBase64 = require('nodemailer-plugin-inline-base64');
    console.log("initiating sender for Qrcode image");
    let sender = await fetchMailer();
    if (sender) {
      let transporter = createTransport({
        //service: 'gmail',
        host: sender.host,
        port: sender.port,
        secure: true, // true for 465, false for other ports
        auth: {
          user: sender.email,
          pass: sender.password,
        },
      });
      // transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'}));
      let html = `<h1>${template}</h1>`;
      let mailOptions = {
        from: `"${sender.alias}" ${sender.email}`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: html,
        attachments: [
          {
            filename: "QrCodes.pdf",
            content: doc,
            contentType: "application/pdf",
          },
        ],
      };
      let info = await transporter.sendMail(mailOptions);
      await transporter.close();
      return console.log("Message sent: %s", info.messageId);
    } else throw "Cannot send email : No mailer found";
  } catch (e) {
    return console.log(e);
  }
};
/**
 *
 * @param {String} to Email id of User
 * @param {String} subject Subject of email
 * @param {Array} attachments Array of attachments (file streams)
 * @param {String} template Pug template
 * @param {Object} data Object
 * @returns {Promise}
 */
exports.sendAttachments = async (to, subject, attachments, template, data) => {
  let sender = await fetchMailer();
  if (sender) {
    let transporter = createTransport({
      // service: 'gmail',
      host: sender.host,
      port: sender.port,
      secure: true, // true for 465, false for other ports
      auth: {
        user: sender.email,
        pass: sender.password,
      },
    });
    let mailOptions = {
      from: `"${sender.alias}" ${sender.email}`, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: "", // plain text body
      attachments,
    };
    if (template) {
      let html = compile(template, data);
      mailOptions.html = html; // html body
    }
    let info = await transporter.sendMail(mailOptions);
    await transporter.close();
    console.log("Message sent: %s", info.messageId);
    return;
  } else throw "Cannot send email : No mailer found";
};
