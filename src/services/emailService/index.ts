import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT!),
    secure: false, // use false for STARTTLS; true for SSL on port 465
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
) {
    // Prepare the email message options.
    const mailOptions = {
        from: process.env.SENDER_EMAIL, // Sender address from environment variables.
        to: `${recipientName} <${recipientEmail}>`, // Recipient's name and email address.
        replyTo: process.env.REPLY_TO, // Sets the email address for recipient responses.
        subject: subject, // Subject line.
        text: message, // Plaintext body.
    };

    // Send email and log the response.
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
}
