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
  .sync({ force: false })
  .then(() => {
    server.listen(port, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  })
  .then(() => {
    Category.findOrCreate({ where: {name: "Jersey"} });
    Category.findOrCreate({ where: {name: "Balon"} });
    Category.findOrCreate({ where: {name: "Calzado"} });
    Category.findOrCreate({ where: {name: "Short"} });

    console.log("Categorias creadas");
  });
