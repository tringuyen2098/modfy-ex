import nodemailer from 'nodemailer';
import config from '../config/mail.json' assert { type: 'json' };

async function sendEmail(payload) {
    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
        from: `"Modfy 👻" <${config.auth?.user}>`,
        to: payload.to, 
        subject: payload.subject,
        text: payload.text, 
        html: payload.html,
      });

    return info;
}


export function sendAuthenticationMail(email, code){
  const payload  = {
      to: email,
      subject: "Account Confirmation Email",
      html: `
        <a href="http://localhost:8080/api/users/active/${code}?email=${email}" style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #f5e3ae; background-color: ; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 2px solid #f5e3ae; border-right: 2px solid #f5e3ae; border-bottom: 2px solid #f5e3ae; border-left: 2px solid #f5e3ae; padding-top: 10px; padding-bottom: 10px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; text-align: center; mso-border-alt: none; background-color: black; word-break: keep-all;" target="_blank"><span style="padding-left:20px;padding-right:20px;font-size:15px; display:inline-block;"><span style="font-size: 16px; line-height: 2; mso-line-height-alt: 32px;"><span style="font-size: 15px; line-height: 30px;"><strong>Active Register Email</strong></span></span></span></a>
      `
  }

  return sendEmail(payload);
}