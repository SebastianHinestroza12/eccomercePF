const router = require("express").Router();
const { User } = require('../db');

router.put('/', async (req, res) => {
  const { id } = req.body;
  const { visible } = req.body;

  try {
    if (visible) {

      await User.update({ visible }, {
        where: { id: id }
      });

      return res.send("Usuario baneado correctamente")
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(400).json('No se selecciono ninguna propiedad a modificar');
  }
})

module.exports = router;