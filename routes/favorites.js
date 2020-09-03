const express = require("express");

const cryptoController = require("../controllers/cryptoController");

const router = express.Router();

router.get("/", cryptoController.getFavoriteCryptos);

module.exports = router;
