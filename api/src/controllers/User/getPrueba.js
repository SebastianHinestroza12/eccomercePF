const router = require("express").Router();
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");
const jwtAuthz = require("express-jwt-authz");

// const verifyJwt = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: "https://qatar-e-shop.us.auth0.com/.well-known/jwks.json",
//   }),
//   audience: "This is a unique identifier",
//   issuer: "https://qatar-e-shop.us.auth0.com/",
//   algorithms: ["RS256"],
// }).unless({ path: ["/user/prueba"] });
const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    jwksUri: "https://qatar-e-shop.us.auth0.com/.well-known/jwks.json", // aqui comprueba que se este loguado en la web de qatar y no en cualquier otro lado (obligado)
  }),
  
  algorithms: ["RS256"], //necesita si o si que se le indique el tipo de algoritmo (obligado)
})

const checkPermissions = jwtAuthz(["read:users", "write:users"], {
  customScopeKey: "permissions",
  customUserKey: "auth",
  checkAllScopes: true
  // debe cumplir todos los permisos especificados
});

router.get("/role", verifyJwt, checkPermissions, (req, res) => {
  res.send("Accediendo a ruta ROLES");
});

router.get("/", (req, res) => {
  try {
    res.send("Accediendo a ruta PUBLICA");
  } catch (error) {
    console.log({ error });
  }
});

router.get("/protected", verifyJwt, (req, res) => {
  try {
    res.send("Accediendo a ruta PROTEGIDA");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
