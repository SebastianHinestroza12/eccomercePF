require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { CONECTION } = process.env;

/**
 * CONEXION CON LA BD EN PRODUCCION
 */

const sequelize = new Sequelize(`${CONECTION}`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

sequelize.query("CREATE EXTENSION IF NOT EXISTS unaccent");

const { Product, User, Order, Category, Review, Cart, Item } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Category, { through: "product-category" });
Category.belongsToMany(Product, { through: "product-category" });

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

Product.belongsToMany(Order, { through: "order-product" });

// Cart.belongsToMany(Product, { through: Product_Cart });
// Product.belongsToMany(Cart, { through: Product_Cart });

Cart.hasMany(Item);
Item.belongsTo(Cart);

User.hasOne(Cart);
Cart.belongsTo(User);


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};