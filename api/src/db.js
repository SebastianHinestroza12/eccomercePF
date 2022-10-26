require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

/**
 * CONEXION CON LA BD EN PRODUCCION
 */
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/eccomerce`,
        {
          logging: false, // set to console.log to see the raw SQL queries
          native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        }
      );

/*
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/eccomerce`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
*/
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

const { Admin, Product, User, Order, Category, Review, Cart, Product_Cart} = sequelize.models;
// const Product_Cart = sequelize.define("Product_Cart", 
//   {
//     size: {
//       type: DataTypes.STRING,
//       defaultValue: "S",
//       allowNull: false
//     },
//     units: {
//       type: DataTypes.INTEGER,
//       defaultValue: 1,
//       allowNull: false
//     },
//     price: {
//       type: DataTypes.INTEGER,
//       defaultValue: 1,
//       allowNull: false
//     },
//   }, 
//   {timestamps: false}
// )


// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Admin.hasMany(Product);
Product.belongsToMany(Admin, { through: "admin-product" });

Admin.hasMany(User);
User.belongsToMany(Admin, { through: "admin-client" });

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(Category, { through: "product-category" });
Category.belongsToMany(Product, { through: "product-category" });

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

Product.belongsToMany(Order, { through: "order-product" });

Cart.belongsToMany(Product, { through: Product_Cart });
Product.belongsToMany(Cart, { through: Product_Cart });

User.hasOne(Cart);
Cart.belongsTo(User);

// //Muchos productos pueden estar en una misma orden y distintas ordenes pueden tener a los mismos productos
// Product.belongsToMany(Cart, { through: "Product_cart" }); //orders
// Cart.belongsToMany(Product, { through: "Product_cart" }); //products

// //Un usuario puede tener varias ordenes, pero cada orden pertenece a un único usuario
// Cart.belongsToMany(User, { through: "user_cart" }); //orders
// User.belongsToMany(Cart, { through: "user_cart" }); //products

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};