const router = require("express").Router();
const { User } = require('../../db');


router.get('/', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(404).json(`NO EXISTE USUARIO CON EMAIL '${email}'`);
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log({ error })
  }
})

module.exports = router