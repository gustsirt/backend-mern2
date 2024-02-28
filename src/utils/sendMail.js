import nodemailer from 'nodemailer';
import configObject from '../config/index.js';
import __dirname from './dirname.js';

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: configObject.gmail_user_app,
    pass: configObject.gmail_pass_app
  },
  tls: {
      rejectUnauthorized: false
  }
})

export const sendMail = async ( to, subject, bodyhtml) => {
  return await transport.sendMail({
    from: 'Gustavo Sirtori <gustavo.sirtori@gmail.com>',
    to,
    subject,
    html: bodyhtml,
    // attachments: [
    //   {
    //     filename: 'think-about.png',
    //     path: __dirname + '/utils/sendMailUtil/think-about.png',
    //     contentType: 'Piensa'
    //   }]
  })
}