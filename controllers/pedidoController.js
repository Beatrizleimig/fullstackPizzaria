let db;

function initDB(dbo) {
  db = dbo;
}

// Inserindo no banco
function insertPedido(req, res) {
  console.log('data', req);
  const { cliente, itens, status, valor_total, data_hora } = req;

  console.log(cliente, itens, status, valor_total, data_hora);

  db.run(
    "INSERT INTO pedidos (cliente, itens, status, valor_total, data_hora) VALUES (?, ?, ?, ?, ?)",
    cliente,
    JSON.stringify(itens), // Armazenando itens como JSON
    status,
    valor_total,
    data_hora,
    (err) => {
      if (err) {
        console.error("Erro ao criar o pedido:", err);
        return res.status(500).json({ error: "Erro ao criar o pedido" });
      }

      res.status(201).json({ message: "Pedido cadastrado com sucesso" });
    }
  );
}

// Selecionando todos os pedidos
function selectPedidos(res) {
  db.all("SELECT * FROM pedidos", (err, rows) => {
    if (err) {
      console.error("Erro ao pegar pedidos:", err);
      return res.status(500).json({ error: "Erro ao listar pedidos" });
    }
    const data = rows.map(row => ({
      ...row,
      itens: JSON.parse(row.itens) // Convertendo de JSON para objeto
    }));
    res.json(data);
  });
}

// Selecionando pedido por ID
function selectPedidoId(res, id) {
  db.get("SELECT * FROM pedidos WHERE id = ?", id, (err, row) => {
    if (err) {
      console.error("Erro ao pegar pedido:", err);
      return res.status(500).json({ error: "Erro ao listar pedido" });
    }
    if (row) {
      row.itens = JSON.parse(row.itens);
      res.json(row);
    } else {
      res.status(404).json({ message: "Pedido não encontrado" });
    }
  });
}

// Atualizando no banco
function updatePedido(req, res) {
  const { id, cliente, itens, status, valor_total, data_hora } = req;

  db.run(
    `UPDATE pedidos SET cliente = ?, itens = ?, status = ?, valor_total = ?, data_hora = ? WHERE id = ?`,
    [cliente, JSON.stringify(itens), status, valor_total, data_hora, id],
    function (err) {
      if (err) {
        console.error("Erro ao atualizar o pedido:", err);
        return res.status(500).json({ error: "Erro ao atualizar o pedido" });
      } else {
        console.log("Pedido atualizado com sucesso");
        res.status(200).json({ message: "Pedido atualizado com sucesso" });
      }
    }
  );
}

// Deletando no banco
function deletePedido(req, res) {
  const { id } = req;

  db.run("DELETE FROM pedidos WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Erro ao deletar o pedido:", err);
      return res.status(500).json({ error: "Erro ao deletar o pedido" });
    } else {
      console.log("Pedido deletado com sucesso");
      res.status(200).json({ message: "Pedido deletado com sucesso" });
    }
  });
}

module.exports = {
  initDB,
  insertPedido,
  selectPedidos,
  selectPedidoId,
  updatePedido,
  deletePedido
};
