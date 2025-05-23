// Criando tabela
function createTablePedido(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente TEXT NOT NULL,
      itens TEXT NOT NULL, -- Produtos e quantidade (pode ser armazenado como JSON)
      status TEXT NOT NULL,
      valor_total REAL NOT NULL,
      data_hora TEXT NOT NULL
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
