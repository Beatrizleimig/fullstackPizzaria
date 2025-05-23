var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");
var { authenticateToken } = require("../controllers/authController");


    /* GET products listing. */
    /**
     * @swagger
     * /products:
     * get:
     * summary: Retorna uma lista de todos os produtos
     * description: Endpoint para buscar todos os produtos cadastrados no sistema. Requer autenticação.
     * tags:
     * - Produtos
     * security:
     * - bearerAuth: []
     * responses:
     * 200:
     * description: Lista de produtos obtida com sucesso.
     * content:
     * application/json:
     * schema:
     * type: array
     * items:
     * type: object
     * properties:
     * id:
     * type: integer
     * example: 1
     * name:
     * type: string
     * example: Laptop
     * price:
     * type: number
     * format: float
     * example: 1200.50
     * description:
     * type: string
     * example: Um laptop de alta performance.
     * 401:
     * description: Não autorizado. Token JWT ausente ou inválido.
     * 500:
     * description: Erro interno do servidor.
     */
    router.get("/", authenticateToken, function (req, res, next) {
      productController.selectProducts(res);
    });

    /**
     * @swagger
     * /products/register:
     * post:
     * summary: Registra um novo produto
     * description: Adiciona um novo produto ao banco de dados. Requer autenticação.
     * tags:
     * - Produtos
     * security:
     * - bearerAuth: []
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * required:
     * - name
     * - price
     * properties:
     * name:
     * type: string
     * example: Smartphone
     * price:
     * type: number
     * format: float
     * example: 899.99
     * description:
     * type: string
     * example: Um smartphone com câmera de alta resolução.
     * responses:
     * 200:
     * description: Produto registrado com sucesso.
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * message:
     * type: string
     * example: Produto inserido com sucesso
     * 400:
     * description: Dados inválidos fornecidos.
     * 401:
     * description: Não autorizado. Token JWT ausente ou inválido.
     * 500:
     * description: Erro interno do servidor.
     */
    router.post("/register", authenticateToken,(req, res) => {
      productController.insertProduct(req.body, res);
    });


    /**
     * @swagger
     * /products/{id}:
     * get:
     * summary: Retorna um produto específico pelo ID
     * description: Busca os detalhes de um produto usando seu ID. Requer autenticação.
     * tags:
     * - Produtos
     * security:
     * - bearerAuth: []
     * parameters:
     * - in: path
     * name: id
     * schema:
     * type: integer
     * required: true
     * description: ID numérico do produto a ser buscado.
     * responses:
     * 200:
     * description: Produto encontrado com sucesso.
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * id:
     * type: integer
     * example: 1
     * name:
     * type: string
     * example: Laptop
     * price:
     * type: number
     * format: float
     * example: 1200.50
     * description:
     * type: string
     * example: Um laptop de alta performance.
     * 401:
     * description: Não autorizado. Token JWT ausente ou inválido.
     * 404:
     * description: Produto não encontrado.
     * 500:
     * description: Erro interno do servidor.
     */
    router.get("/:id",authenticateToken, function (req, res, next) {
      const id = req.params.id;
      productController.selectProductId(res, id);
    });


    /**
     * @swagger
     * /products/update:
     * patch:
     * summary: Atualiza um produto existente
     * description: Atualiza os dados de um produto existente usando seu ID. Requer autenticação.
     * tags:
     * - Produtos
     * security:
     * - bearerAuth: []
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * required:
     * - id
     * properties:
     * id:
     * type: integer
     * example: 1
     * name:
     * type: string
     * example: Laptop Pro
     * price:
     * type: number
     * format: float
     * example: 1500.00
     * description:
     * type: string
     * example: Nova descrição para o laptop.
     * responses:
     * 200:
     * description: Produto atualizado com sucesso.
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * message:
     * type: string
     * example: Produto atualizado com sucesso
     * 400:
     * description: Dados inválidos fornecidos (ex: ID ausente ou formato incorreto).
     * 401:
     * description: Não autorizado. Token JWT ausente ou inválido.
     * 404:
     * description: Produto não encontrado para atualização.
     * 500:
     * description: Erro interno do servidor.
     */
    router.patch("/update",authenticateToken, (req, res) => {
      productController.updateProduct(req.body, res);
    });

    /**
     * @swagger
     * /products/delete:
     * delete:
     * summary: Deleta um produto
     * description: Remove um produto do banco de dados usando seu ID. Requer autenticação.
     * tags:
     * - Produtos
     * security:
     * - bearerAuth: []
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * required:
     * - id
     * properties:
     * id:
     * type: integer
     * example: 1
     * responses:
     * 200:
     * description: Produto deletado com sucesso.
     * content:
     * application/json:
     * schema:
     * type: object
     * properties:
     * message:
     * type: string
     * example: Produto deletado com sucesso
     * 400:
     * description: ID do produto ausente ou inválido.
     * 401:
     * description: Não autorizado. Token JWT ausente ou inválido.
     * 404:
     * description: Produto não encontrado para exclusão.
     * 500:
     * description: Erro interno do servidor.
         */
    router.delete("/delete",authenticateToken, (req, res) => {
      productController.deleteProduct(req.body, res);
    });

    module.exports = router;