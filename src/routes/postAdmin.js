const router = require("express").Router();
const { Admin } = require ("../db.js");

router.post("/", async (req, res) => {
  try {
    let { name, role, email, password } = req.body;

    await Admin.create({
        role: role, name: name, email: email, password: password
    });

    res.send("Admin creado correctamente");
    
    } catch(err) { 
        res.send("Error al agregar admin");
        console.log("Error en postAdmin.js:", err.message) 
    }
});

module.exports = router;