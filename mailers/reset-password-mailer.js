const nodemailer = require("nodemailer");
const env = require("../config/environment");

module.exports.sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: env.host,
            service: 'iCloud',
            port: 587,
            secure: false,
            auth: {
                user: env.user,
                pass: env.pass,
            },
            
        });

        await transporter.sendMail({
            from: 'support@sanam.tech',
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

