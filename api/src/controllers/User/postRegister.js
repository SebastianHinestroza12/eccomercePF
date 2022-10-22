const router = require("express").Router();
const { User } = require('../../db');
const transporter = require('../../config/nodemailer');
const message = require('../../templates/message');

router.post('/', async (req, res) => {
  const { name, email, picture } = req.body;

  try {
    const verifique = await User.findOne({
      where: {
        email
      }
    })
    if (verifique) {
        console.log(`YA EXISTE EL USUARIO ${email}`);
        return res.status(404).json({
        message: `YA EXISTE EL USUARIO ${email}`
      })
    }

    await User.findOrCreate({
      where: {
        name,
        email,
        picture
      }
    });
    // SEND EMAIL WITH NODEMAILER
    await transporter.sendMail({
      from: '"QatarEshop🏪" <qatareshop08@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Se aproxima el mundial de qatar, tenemos los articulos deportivos perfectos para ti", // Subject line
      html: message
    });
    
    console.log(`¡EL USUARIO '${email}' FUE REGISTRADO CON EXITO✅😉!`);
    return res.status(201).json({
      status: `¡EL USUARIO '${email}' FUE REGISTRADO CON EXITO✅😉!`,
      message: `REVISE SU BANDEJA DE ENTRADA O SPAM`,
    });
  } catch (error) {
    console.error(error);
  }
})

module.exports = router
