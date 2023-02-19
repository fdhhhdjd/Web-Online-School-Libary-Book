const nodeMailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const CONFIGS = require("./config");

/**
   * @author Nguyễn Tiến Tài
   * @created_at 19/02/2023
   * @description Setting sendEmail node Mailer users
   * @function sendEmail
   * @param { Object}
   */
const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: CONFIGS.SMTP_HOST,
        port: CONFIGS.SMTP_PORT,
        secure: false, // use SSL
        service: CONFIGS.SMTP_SERVICE,
        auth: {
            user: CONFIGS.SMTP_MAIL,
            pass: CONFIGS.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const handlebarOptions = {
        viewEngine: {
            extName: ".html",
            partialsDir: path.resolve("./src/share/views/user_views"),
            defaultLayout: false,
        },
        viewPath: path.resolve("./src/share/views/user_views"),
        extName: ".html",
    };

    transporter.use("compile", hbs(handlebarOptions));

    const mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        attachments: options.attachments,
        template: options.template,
        context: options.context,
        html: options.html,
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;