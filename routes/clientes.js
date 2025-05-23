var express = require("express");
var router = express.Router();
var clientController = require("../controllers/clienteController");
var { authenticateToken } = require("../controllers/authController");

/* GET clientes listing. */
router.get("/", authenticateToken, function (req, res, next) {
  clienteController.selectClients(res);
});

router.post("/register", authenticateToken, (req, res) => {
  clientController.insertCliente(req.body, res);
});

router.get("/:id", authenticateToken, function (req, res, next) {
  const id = req.params.id;
  clienteController.selectClienteById(res, id);
});

router.patch("/update", authenticateToken, (req, res) => {
  clienteController.updateCliente(req.body, res);
});

router.delete("/delete", authenticateToken, (req, res) => {
  clienteController.deleteCliente(req.body, res);
});

module.exports = router;
