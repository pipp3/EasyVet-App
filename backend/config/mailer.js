import dotenv from "dotenv";
import {Resend} from 'resend'
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendEmail = async (email, subject, text) => {
    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: subject,
        html: text,
      });
      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
}


