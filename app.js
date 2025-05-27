const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const sqlite3 = require("sqlite3").verbose();
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const secret = require("./secret"); // Certifique-se que este arquivo existe e exporta um segredo
const cors = require("cors");
const swaggerUi = require('swagger-ui-express'); // Importe o swagger-ui-express
const swaggerSpec = require('./config/swagger'); // Importe a especificação Swagger

const app = express();

// Configuração do body-parser (usando body-parser)
app.use(bodyParser.json());

// --- Configuração do CORS ---
// Ajuste o 'origin' para permitir requisições apenas do seu frontend na porta 3001
const corsOptions = {
    origin: "http://localhost:3001", // ESSENCIAL: Permite apenas o seu frontend
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// --- Fim da Configuração do CORS ---

app.use(express.json()); // Este middleware já é fornecido pelo Express 4.16+, pode substituir bodyParser.json() em alguns casos, mas manteremos ambos por compatibilidade.

// Configuração da sessão (usando express-session)
app.use(
    session({
        secret: secret, // Use a sua chave secreta importada
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // 'secure: true' em produção para HTTPS
    }),
);

// Configuração do rate limiting para proteção contra ataques de força bruta
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // 5 tentativas máximas por IP
    message: "Muitas tentativas de login a partir deste IP, por favor, tente novamente após 15 minutos.",
});
app.use("/login", limiter); // Aplica o rate limiting apenas na rota de login

// Instancia do BANCO SQLITE
const db = new sqlite3.Database("./db/database.db", (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados SQLite:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
    }
});


// Criação e atualização das entidades
const userModel = require("./models/userModel");
const productModel = require("./models/productModel");
const clienteModel = require("./models/clienteModel");
const pedidoModel = require("./models/pedidoModel");
const pedidoItemModel = require("./models/pedidoItemModel");
userModel.createTableUser(db);
productModel.createTableProduct(db);
clienteModel.createTableCliente(db);
pedidoModel.createTablePedido(db);
pedidoItemModel.createTablePedidoItem(db);

// Criação dos controllers e da aplicação
const authController = require("./controllers/authController");
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");
const clienteController = require("./controllers/clienteController");
const pedidoController = require("./controllers/pedidoController");

// Iniciando o DB nos controllers
authController.initDB(db);
userController.initDB(db);
productController.initDB(db);
clienteController.initDB(db)
pedidoController.initDB(db)

// Rotas da aplicação
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var clientesRouter = require("./routes/clientes");
var pedidosRouter = require("./routes/pedidos");
// --- Configuração do Swagger UI ---
// Defina a rota onde a documentação do Swagger estará disponível
const swaggerDocsPath = '/api-docs'; // Rota para acessar a documentação

app.use(swaggerDocsPath, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// --- Fim da Configuração do Swagger UI ---


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/clientes", clientesRouter);
app.use("/pedidos", pedidosRouter);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev")); // 'dev' é um formato de log amigável para desenvolvimento

app.use(express.urlencoded({ extended: false })); // Para parsing de application/x-www-form-urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // Serve arquivos estáticos da pasta 'public'

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação do Swagger disponível em http://localhost:${PORT}${swaggerDocsPath}`); // Log da URL do Swagger
});

module.exports = { app, db };