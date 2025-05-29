import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export default async function sendEmail(
    recipientName: string,
    recipientEmail: string,
    subject: string,
    message: string,
    attachments: { path: string }[],
) {
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: `${recipientName} <${recipientEmail}>`,
        bcc: `${process.env.NOME_PESSOA_COPIA_OCULTA} <${process.env.EMAIL_PESSOA_COPIA_OCULTA}>`,
        replyTo: process.env.REPLY_TO,
        subject: subject,
        text: message,
        attachments: attachments,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
}
