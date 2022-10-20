const router = require("express").Router();
const { Client } = require("../db.js");

router.post("/", async (req, res) => {
  try {
    let { name, email, password, address, country, state, city, postal_code, dni, phone } = req.body;

    await Client.create({
      name: name,
      email: email,
      password: password,
      address: address,
      country: country,
      state: state,
      city: city,
      postal_code: postal_code,
      dni: dni,
      phone: phone
    });

    res.send("Cliente creado correctamente");
  } catch (err) {
    res.send("Error al agregar Cliente");
    console.log("Error en postClient.js:", err.message);
  }
});

module.exports = router;
