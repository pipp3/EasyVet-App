import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD
    }
});

export const sendEmail = async (email, subject, text) => {
    const mailOptions = {
        from: 'noreply@easyvet.com',
        to: email,
        subject,
        text
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email enviado con éxito a: ", email);
    } catch (error) {
        console.error("Error al enviar el email: ", error);
        throw new Error("No se pudo enviar el email");
    }

}

export default transporter;