const router = require("express").Router();
const { Category } = require ("../db.js");

router.post("/", async (req, res) => {
  try {
    let { name } = req.body;

    Category.findOrCreate({ 
        where: { name: name }
    });
    
    res.send("Categoria creada");
    
    } catch(err) { 
        res.send("Error al agregar categoria");
        console.log("Error en postCategory.js:", err.message) 
    }
});

module.exports = router;