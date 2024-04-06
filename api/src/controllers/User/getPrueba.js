const router = require("express").Router();
const { expressjwt: jwt } = require("express-jwt");
const jwtDiferente = require('jsonwebtoken')
const { config } = require('./config')
const jwks = require("jwks-rsa");
const axios = require("axios");
const jwtAuthz = require("express-jwt-authz");

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://qatar-e-shop.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "This is a unique identifier",
  issuer: "https://qatar-e-shop.us.auth0.com/",
  algorithms: ["RS256"],
}).unless({ path: ["/user/prueba"] });

const checkPermissions = jwtAuthz(["read:users"], {

  customScopeKey: "permissions",
  customUserKey: "auth",
  // checkAllScopes: true
  // debe cumplir todos los permisos especificados
})

router.get('/role', verifyJwt, checkPermissions, (req, res) => {
  res.send("Accediendo a ruta ROLES");
})

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
router.get('/auth', (req, res) => {
  // const { email, username, name } = req.body  
  const token = jwtDiferente.sign({ sub: {username:"pepe", email:"argento", name:"mony"} }, config.authJwtSecret)
  // res.send("Accediendo a ruta AUTH");
  res.json({access_token: token})
})
router.get('/auth/verify', (req, res, next) => {
 const { access_token } = req.query
 try {
  const decoded = jwtDiferente.verify(access_token, config.authJwtSecret)
  res.json({message: true, username: decoded.sub})
 } catch (error) {
  console.log(error.message)
 }
})


module.exports = router;