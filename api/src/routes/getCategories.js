const router = require("express").Router();
const { Category } = require("../db.js");
const jsonCats = require("../JSON/jsonCategories");

const categories = () => {
  const data = jsonCats.map((i) => i);
  return data;
};

router.get("/", async (req, res) => {
  const cats = categories();

  try {
    cats.forEach((i) => {
        Category.findOrCreate({
        where: {
          name: i.name,
        },
      });
    });

    const resp = await Category.findAll();
    return res.json(resp);
  
  } catch (err) {
    console.log("Error en getCats.." + err.message);
  }
});

module.exports = router;
