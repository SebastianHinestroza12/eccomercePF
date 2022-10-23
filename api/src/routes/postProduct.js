const router = require("express").Router();
const { Product, Category } = require ("../db.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


router.post("/", async (req, res) => {
  try{
    let { name, price, detail, size_stock, image, stars, category, visible } = req.body;

    let newProduct = await Product.create({
        name: name, price: price, detail: detail, size_stock: size_stock, image: image, stars: stars, visible: visible
    });

    Category.findOrCreate({ 
        where: { name: category }
    });

    const matchingCategorys = await Category.findAll({
        where: {
            name: {
                [Op.eq]: category,
            },
        },
    });
    
    await newProduct.setCategories(matchingCategorys);

    res.send("Producto creado correctamente");
    
    } catch(err) { 
        res.send("Error al agregar producto");
        console.log("Error en postProduct:", err.message) 
    }
});

module.exports = router;