//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Category } = require("./src/db.js");
const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    console.log("¡Conexión a la base de datos satisfactoria!");
    server.listen(port, () => {
      console.log("Servidor Corriendo🍓"); // eslint-disable-line no-console
    });
  })
  .then(() => {
    // Creación de categorías (si es necesario)
    Category.findOrCreate({ where: { name: "Jersey" } });
    Category.findOrCreate({ where: { name: "Balon" } });
    Category.findOrCreate({ where: { name: "Calzado" } });
    Category.findOrCreate({ where: { name: "Short" } });
  })
  .catch((error) => {
    console.error("¡Error en la conexión a la base de datos😫", error);
    process.exit(1);
  });