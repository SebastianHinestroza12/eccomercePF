const router = require("express").Router();
const { User } = require('../../db');

router.put('/', async (req, res) => {
  const { name, email, surnames, picture, address, country, city, postal_code, phone, dni } = req.body;

  try {

    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) return res.status(302).json({
      error: `NO EXISTE UN USUARIO CON EMAIL ${email} POR ENDE NO SE PUEDEN MODIFICAR SUS DATOS`
    })
    else {
      if (name || surnames || picture || address || country || city || postal_code || phone || dni) {
        await User.update({ name, surnames, picture, address, country, city, postal_code, phone, dni }, {
          where: {
            email
          }
        })
        return res.status(200).json({
          modificado: true,
          update_Data: await User.findOne({
            where: {
              email
            }
          })
        });
      }
      return res.status(304).json({
        modificado: false,
        error: 'NO SELECCIONO NINGUN DATO A MODIFICAR😒'
      })
    }
  } catch (error) {
    console.log(error.message);
  }
})

module.exports = router;