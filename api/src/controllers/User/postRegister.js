const router = require("express").Router();
const { User } = require('../../db');
const transporter = require('../../config/nodemailer');

router.post('/', async (req, res) => {
  const { name, email, picture } = req.body;

  try {
    const verifique = await User.findOne({
      where: {
        email
      }
    })
    if (verifique) return res.status(404).json({
      message: `YA EXISTE EL USUARIO ${email}`
    })

    await User.findOrCreate({
      where: {
        name,
        email,
        picture
      }
    });
    // SEND EMAIL WITH NODEMAILER
    await transporter.sendMail({
      from: '"Qatar Store⚽" <menas7527@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Gracias Por Registrarte En Nuetra Tienda🤗!", // Subject line
      html: `
        <div>
          <h1>Welcome! ${name}</h1>
          <p>
            Gracias por unirte a esta gran familia, esperamos tengas una buena
            experiencia😉
          </p>
        </div>
    
      `
    });

    return res.status(201).json({
      status: `¡EL USUARIO ${email} FUE REGISTRADO CON EXITO✅😉!`,
      message: `REVISE SU BANDEJA DE ENTRADA O SPAM`,
    });
  } catch (error) {
    console.error(error);
  }
})

module.exports = router