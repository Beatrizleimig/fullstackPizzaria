let db;

function initDB(dbo) {
  db = dbo;
}

function sumItens(varItens){
  if (varItens && varItens.length > 0) {
    result = 0;
    varItens.forEach(item => {
      result += (item.quantidade * item.preco);
    });
  }
  return result;
}

// Inserindo no banco
function insertPedido(req, res) {
  
  console.log('Body recebido:', req.body);
  const { id_cliente, status, itens } = req.body; 
  console.log(id_cliente, status, itens);

  db.run(
    "INSERT INTO pedidos (id_cliente, status, valor_total, data_hora) VALUES (?, ?, ?, current_timestamp)",
    id_cliente,
    status,
    sumItens(itens),
    (err) => {
      if (err) {
        console.error("Erro ao criar o pedido:", err);
        return res.status(500).json({ error: "Erro ao criar o pedido" });
      }
      
      const id_pedido = this.lastID; // Obtém o ID do pedido inserido

        // Agora, vamos inserir os itens do pedido
        if (itens && itens.length > 0) {
          const stmt = db.prepare("INSERT INTO pedido_itens (id_pedido, id_product, qtd, preco) VALUES (?, ?, ?, ?)");
          itens.forEach(item => {
              stmt.run(id_pedido, item.produtoId, item.quantidade, item.preco, (err) => {
                  if (err) {
                      console.error("Erro ao inserir item do pedido:", err);
                      // Aqui você pode decidir se quer interromper o processo ou continuar
                      // Para simplificar, vamos apenas logar o erro por enquanto.
                  }
              });
          });
          stmt.finalize((err) => {
            if (err) {
              console.error("Erro ao finalizar inserção de itens:", err);
              return res.status(500).json({ error: "Erro ao inserir itens do pedido" });
            }
            res.status(201).json({ message: "Pedido cadastrado com sucesso" });
          });
      } else {
        // Se não houver itens
        res.status(201).json({ message: "Pedido cadastrado sem itens", pedido: { id: id_pedido, valor_total: 0 } });
      }
    }
  );
}

// Selecionando todos os pedidos
function selectPedidos(res) {
  db.all("SELECT p.id, p.id_cliente, status, round(p.valor_total, 2) as valor_total, p.data_hora, c.name as clienteName FROM pedidos p, clientes c where p.id_cliente = c.id", (err, row) => {
    if (err) {
      console.error("Erro ao pegar pedidos:", err);
      return res.status(500).json({ error: "Erro ao listar pedidos" });
    }
    res.json(row);
  });
}

// Selecionando pedido por ID
function selectPedidoId(res, id) {
  db.get("SELECT p.* FROM pedidos p WHERE p.id = ?", id, (err, row) => {
    if (err) {
      console.error("Erro ao pegar pedido:", err);
      return res.status(500).json({ error: "Erro ao listar pedido" });
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ message: "Pedido não encontrado" });
    }
  });
}

// Atualizando no banco
function updatePedido(req, res) {
  const { id, id_cliente, status, itens } = req.body;

  db.run(
    `UPDATE pedidos SET id_cliente = ?, status = ?, valor_total = ? WHERE id = ?`,
    [id_cliente, status, sumItens(itens), id],
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
    console.log("Body recebido para delete:", req.body); // 🔥 Debug

    const { id } = req.body; // ⚠️ Confirme se o ID está vindo corretamente

    if (!id) {
        return res.status(400).json({ error: "ID do pedido é obrigatório" });
    }

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
