const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'menas7527@gmail.com', // generated ethereal user
    pass: 'rybcazjhbgnmbjpj', // generated ethereal password
  },
});

transporter.verify().then(() => {
  console.log('LISTO PARA ENVIAR EMAIL');
})

module.exports = transporter