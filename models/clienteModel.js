function createTableCliente(db) {
  db.run(
    `CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      address TEXT,
      email TEXT UNIQUE NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Erro ao criar a tabela clientes:", err);
      } else {
        console.log("Tabela clientes criada com muito sucesso");
      }
    }
  );
}

module.exports = { createTableCliente };



