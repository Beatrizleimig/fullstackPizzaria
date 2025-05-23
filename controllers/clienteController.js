let db;

function initDB(dbo) {
  db = dbo;
}

// Inserindo no banco
function insertCliente(req, res) {
  const { name, email, phone, address } = req;

  db.get("SELECT * FROM clientes WHERE email = ?", email, (err, row) => {
    if (row) {
      return res.status(400).json({ error: "Cliente com este email já existe" });
    }

    db.run(
      "INSERT INTO clientes (name, email, phone, address) VALUES (?, ?, ?, ?)",
      [name, email, phone, address],
      (err) => {
        if (err) {
          console.error("Erro ao criar o cliente:", err);
          return res.status(500).json({ error: "Erro ao criar o cliente" });
        }

        res.status(201).json({ message: "Cliente cadastrado com sucesso" });
      }
    );
  });
}


// Selecionando no banco
function selectClientes(res) {
  db.all("SELECT * FROM clientes", (err, rows) => {
    if (err) {
      console.error("Erro ao pegar clientes:", err);
      return res.status(500).json({ error: "Erro ao listar clientes" });
    }
    res.json(rows);
  });
}

function selectClienteById(res, id) {
  db.get("SELECT * FROM clientes WHERE id = ?", id, (err, row) => {
    if (err) {
      console.error("Erro ao pegar cliente:", err);
      return res.status(500).json({ error: "Erro ao listar cliente" });
    }
    res.json(row);
  });
}

// Atualizando no banco
function updateCliente(req, res) {
  const { id, name, email, phone, address } = req;

  db.run(
    `UPDATE clientes SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?`,
    [name, email, phone, address, id],
    function (err) {
      if (err) {
        console.error("Erro ao atualizar o cliente:", err);
        return res.status(500).json({ error: "Erro ao atualizar o cliente" });
      } else {
        console.log("Cliente atualizado com sucesso");
        res.status(200).json({ message: "Cliente atualizado com sucesso" });
      }
    }
  );
}


// Deletando no banco
function deleteCliente(req, res) {
  let { id } = req;

  db.run(`DELETE FROM clientes WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error("Erro ao deletar o cliente:", err);
      return res.status(500).json({ error: "Erro ao deletar o cliente" });
    } else {
      console.log("Cliente deletado com sucesso");
      res.status(200).json({ message: "Cliente deletado com sucesso" });
    }
  });
}

module.exports = {
  initDB,
  insertCliente,
  selectClientes,
  selectClienteById,
  updateCliente,
  deleteCliente,
 
};