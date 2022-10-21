
const message = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>

    <style>
      body {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
      }
      .container {
        background-color: #e3e3e3;
        width: 100%;
      }
      .container-sub {
        padding: 20px 10px 20px 10px;
      }
      .logo {
        padding: 10px 0px 10px 0px;
        width: 100%;
        text-align: center;
        background-color: black;
      }
      .data {
        background-color: #fff;
        padding: 20px 0 5px 0px;
        width: 100%;
        text-align: center;
      }

      .promo {
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(2, 0fr);
        justify-content: center;
        align-items: center;
        padding: 5px 0px 0px 0px;
        width: 60%;
        text-align: center;
      }
      .botines {
        margin: 10px;
        cursor: pointer;
        background-color: black;
        color: #fff;
      }
      img {
        width: 200px;
        height: 140px;
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
      .image {
        width: 150px;
        height: 80px;
      }
      #p1 {
        text-transform: uppercase;
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
          <h1>¡Bienvenido!</h1>
          <strong
            ><p id="p1">
              Somos pioneros en deporte, estilo y rendimiento, y lo vas a ver
              enseguida.
            </p></strong
          >
          <p>
            Gracias por registrarte. Te lo agradecemos con el envío GRATUITO.
            <br />
            Sin importe mínimo. Sin restricciones.
          </p>

          <div class="btn">
            <a href="https://www.google.com/" target="_blank" class="buy"
              >COMPRAR AHORA</a
            >
          </div>

          <!-- footer -->
          <div class="promo">
            <div class="botines">
              <img
                class="si"
                src="https://res.cloudinary.com/ddl3snuoe/image/upload/v1665596958/LPU7XW4HXNF2PM7I36T2XFDSUE_hjkyjz.jpg"
                alt="brasil"
              />
              <p>
                JERSEY SELECCIÓN <br />
                BRASIL
              </p>
              <p>$75.00</p>
            </div>
            <div class="botines">
              <img
                src="https://res.cloudinary.com/ddl3snuoe/image/upload/v1665597680/Jersey_de_Local_Argentina_22_Blanco_HF1495_01_laydown_nohfhc_oenfia.jpg"
                alt="argentina"
              />
              <p>
                JERSEY SELECCIÓN <br />
                ARGENTINA
              </p>
              <p>$75.00</p>
            </div>
            <div class="botines">
              <img
                src="https://res.cloudinary.com/ddl3snuoe/image/upload/v1665528971/Minibalon_Al_Rihla_Blanco_H57793_01_standard_beirid.jpg"
                alt="balon qatar"
              />
              <p>
                BALÓN <br />
                AL RIHLA
              </p>
              <p>$35.00</p>
            </div>
            <div class="botines">
              <img
                src="https://res.cloudinary.com/ddl3snuoe/image/upload/v1665524632/Calzado_de_Futbol_X_Speedportal_Messi.4_Pasto_Sintetico_Blanco_GW8401_22_model_d6znav.jpg"
                alt="calzado messi"
              />
              <p>
                SPEEDPORTAL <br />
                MESSI.4
              </p>
              <p>$39.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

`

module.exports = message