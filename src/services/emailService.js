require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });


    let info = await transporter.sendMail({
        from: '"Son 👻" <hongsonndvn2023@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend)
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let language = dataSend.language;
    let result = '';
    if (language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu cách thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận 
        và hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>

        <div>Xin chân thành cám ơn</div>
        `
    }

    if (language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on Bookingcare</p>
        <p>Information for scheduling medical examination:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the above information is true, please click on the link below to confirm and complete 
        the medical examination appointment procedure.</p>
        <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>

        <div>Thank you very much</div>
        `
    }

    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}