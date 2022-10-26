const router = require("express").Router();
const { User } = require("../db.js");

router.get("/", async (req, res) => {

  try {

    const resp = await User.findAll({ include: { all: true }});

    return res.json(resp);
  
  } catch (err) {
    console.log("Error en getUsers.js" + err.message);
  }
});

module.exports = router;