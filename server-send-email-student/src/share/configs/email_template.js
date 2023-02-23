const nodeMailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

const CONSTANTS = require('../configs/constants')
const CONFIGS = require("./config");
const HELPER = require('../utils/helpers')

/**
   * @author Nguyễn Tiến Tài
   * @created_at 19/02/2023
   * @updated_at 23/02/2023
   * @description Setting sendEmail node Mailer users
   * @function sendEmail
   * @param { Object}
   */
const sendEmail = async (options, type) => {

    // Create link Path
    const link_path = HELPER.getURIFromTemplate(CONSTANTS.PATH_FOLDER_U_A, {
        folder_u_a: type === CONSTANTS.TYPE_STUDENT ? CONSTANTS.STUDENT_FOLDER : CONSTANTS.ADMIN_FOLDER
    });

    // Option send email
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

    //Template Sendemail
    const handlebarOptions = {
        viewEngine: {
            extName: ".html",
            partialsDir: path.resolve(link_path),
            defaultLayout: false,
        },
        viewPath: path.resolve(link_path),
        extName: ".html",
    };

    transporter.use("compile", hbs(handlebarOptions));

    //Send Email
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