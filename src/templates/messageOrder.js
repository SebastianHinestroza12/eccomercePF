
const messageOrder = (numberOrder, dateOrder, products, totalOrder) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Confirmacion Pedido</title>

    <style>
      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }
      .container {
        background-color: #e3e3e3;
        width: 100%;
      }
      .container-sub {
        padding: 10px 10px 10px 10px;
      }
      .logo {
        padding: 10px 0px 10px 0px;
        width: 100%;
        text-align: center;
        background-color: black;
      }
      .data {
        background-color: #fff;
        width: 100%;
        text-align: center;
      }
      .buy {
        width: 30%;
        background-color: black;
        color: #fff;
        padding: 16px 32px;
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        font-size: 16px;
        margin: 20px 2px;
        transition-duration: 0.4s;
        cursor: pointer;
      }
      .buy:hover {
        background-color: #7e0917;
        color: black;
      }
      .image {
        width: 150px;
        height: 80px;
      }
      p {
        text-transform: capitalize;
        font-weight: bolder;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="container-sub">
        <div class="logo">
          <img
            class="image"
            src="https://res.cloudinary.com/dafsjo7al/image/upload/v1666335511/logoqatartransp_tta1t5.png"
            alt="qatarSore"
          />
        </div>
        <div class="data">
          <h1>Tu pedido ha sido confirmado</h1>
          <h3>RESUMEN DEL PEDIDO:</h3>
          <p>Número de orden</p>
          <span>${numberOrder.slice(0, 8)}</span>
          <p>Fecha de pedido</p>
          <span> ${dateOrder}</span>
          <p>Productos</p>
          <span>${products}</span>
          <p>Total del pedido</p>
          <span>$${totalOrder}</span>
          <h4>
            ¡Gracias por confiar en nosotros! Tenemos tus necesidades como la
            prioridad número 1.
          </h4>
          <div class="btn">
            <a href="https://eccomercepf.vercel.app" target="_blank" class="buy"
              >VER DETALLES DE MI PEDIDO</a
            >
          </div>
        </div>
      </div>
    </div>
  </body>
</html>


`
}

module.exports = messageOrder;