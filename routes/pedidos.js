var express = require("express");
var router = express.Router();
var pedidoController = require("../controllers/pedidoController");
var { authenticateToken } = require("../controllers/authController");

/* GET pedidos listing. */
router.get("/", authenticateToken, function (req, res, next) {
  pedidoController.selectPedidos(res);
});

router.post("/register", authenticateToken, (req, res) => {
  pedidoController.insertPedido(req, res);
});

router.get("/:id", authenticateToken, function (req, res, next) {
  const id = req.params.id;
  pedidoController.selectPedidoId(res, id);
});

router.patch("/update", authenticateToken, (req, res) => {
  pedidoController.updatePedido(req, res);
});

router.delete("/delete", authenticateToken, (req, res) => {
  pedidoController.deletePedido(req, res);
});

module.exports = router;
