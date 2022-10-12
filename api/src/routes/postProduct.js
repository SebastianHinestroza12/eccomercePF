const router = require("express").Router();
const { Product } = require ("../db.js");

router.post("/", async (req, res) => {
  try{
    let { name, price, detail, size, image, stock, score } = req.body;

    await Product.create({
        name: name, price: price, detail: detail, size: size, image: image, stock: stock, score: score
    });

    res.send("Producto creado correctamente");
    
    } catch(err) { 
        res.send("Error al agregar producto");
        console.log("Error en postProduct:", err.message) 
    }
});

module.exports = router;