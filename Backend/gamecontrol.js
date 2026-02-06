const express = require("express");
const router = express.Router()
const app = express();
const port = 3000;
const session = require("express-session");
/*const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");*/
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



module.exports = router;