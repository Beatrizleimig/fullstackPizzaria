// Criando tabela
function createTablePedidoItem(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS pedido_itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_pedido INTEGER NOT NULL,
      id_product INTEGER NOT NULL,
      qtd REAL NOT NULL,
      preco REAL NOT NULL,
      
      FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
      FOREIGN KEY (id_product) REFERENCES products(id)
    )`,
    (err) => {
      if (err) {
        console.error("Erro ao criar a tabela pedido itens:", err);
      } else {
        console.log("Tabela pedido itens criada com muito sucesso");
      }
    }
  );
}

module.exports = { createTablePedidoItem };
