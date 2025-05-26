// Criando tabela
function createTablePedido(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_cliente INTEGER NOT NULL,
      status TEXT NOT NULL,
      valor_total REAL NOT NULL,
      data_hora TEXT NOT NULL,
      FOREIGN KEY (id_cliente) REFERENCES clientes(id)
    )`,
    (err) => {
      if (err) {
        console.error("Erro ao criar a tabela pedidos:", err);
      } else {
        console.log("Tabela pedidos criada com muito sucesso");
      }
    }
  );
}

module.exports = { createTablePedido };
