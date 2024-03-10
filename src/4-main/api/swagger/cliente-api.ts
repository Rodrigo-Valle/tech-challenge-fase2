/**
 * @swagger
 * /cliente:
 *   post:
 *     summary: Cadastra um cliente
 *     tags:
 *       - Cliente
 *     description: Cadastra um novo cliente
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Joao"
 *               email:
 *                 type: string
 *                 example: "joao@example.com"
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *     responses:
 *       201:
 *         description: "Sucesso"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                  example: "successo"
 *                data:
 *                  type: object
 *                  properties:
 *                    id:
 *                      type: string
 *                    nome:
 *                      type: string
 *                    email:
 *                      type: string
 *                    cpf:
 *                      type: string
 *       400:
 *         description: "Requisição inválida"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                  example: "erro"
 *                message:
 *                  type: string
 *                data:
 *                  type: array
 *                  items:
 *                    type: string
 *       422:
 *         description: "Cliente ja cadastrado"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                  example: "erro"
 *                message:
 *                  type: string
 *       500:
 *         description: "Erro interno do servidor"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                  type: string
 *                  example: "erro"
 *                message:
 *                  type: string
 */
