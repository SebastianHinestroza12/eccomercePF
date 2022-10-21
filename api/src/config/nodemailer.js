const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'qatareshop08@gmail.com', // generated ethereal user
    pass: 'cdljeadrlldfgfru', // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log('LISTO PARA ENVIAR EMAIL✅📧');
})

module.exports = transporter