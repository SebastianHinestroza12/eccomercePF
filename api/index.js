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
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Category, Size } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  })
})
.then(() => {

  Category.create({ name: 'Jersey' })
  Category.create({ name: 'Balón' })
  Category.create({ name: 'Botínclear' })

  console.log("Categorias creadas");
})

/*

{
    "id": "x001",
    "name": "BALÓN UNIFORIA FINALE LEAGUE",
    "price": 569,
    "detail": "Este producto está agotado. Suscríbete a nuestra newsletter y entérate antes que nadie de los próximos lanzamientos.",
    "image": "https://res.cloudinary.com/ddl3snuoe/image/upload/v1665524741/Balon_Uniforia_Finale_League_Plata_FT8305_01_standard_ht9tyf.jpg",
    "rating": 3,
    "visible": true

        "talla": [ {name: S, stock: 30},
                   {name: M, stock: 10}
                 ]
        

*/