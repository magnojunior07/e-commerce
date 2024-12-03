import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../../app.module";
import DatabaseService from "../../../database/database.service";

describe("PedidoController (e2e)", () => {
    let app: INestApplication;
    let prisma = DatabaseService.getInstance();

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        // Adicione as validações globais
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
            }),
        );

        await app.init();
    });

    afterAll(async () => {
        await prisma.pedidoItem.deleteMany(); // Limpa itens do pedido
        await prisma.pedido.deleteMany(); // Limpa os pedidos criados
        await prisma.produto.deleteMany(); // Limpa os produtos criados
        await prisma.cliente.deleteMany(); // Limpa os clientes criados
        await app.close();
    });

    describe("POST /pedido", () => {
        let createdCliente: any;
        let createdProduto: any;
        let createdStatus: any;

        beforeAll(async () => {
            // Cria um cliente e um produto para associar ao pedido
            createdCliente = await prisma.cliente.create({
                data: {
                    nome: "Cliente Teste",
                    email: "cliente@teste.com",
                    logradouro: "Rua 123",
                    bairro: "Bairro Teste",
                    numero: "456",
                    estado: "SP",
                    cidade: "São Paulo",
                },
            });

            createdProduto = await prisma.produto.create({
                data: {
                    descricao: "Produto Teste",
                    preco: 100.0,
                    estoque: 10,
                },
            });
            createdStatus = await prisma.status.create({
                data: { descricao: "Status Inicial" },
            });
        });

        it("deve criar um pedido com sucesso", async () => {
            const pedidoData = {
                pessoaId: createdCliente.id,
                statusId: createdStatus.id, // Supondo que você tenha um status pré-cadastrado
            };

            const response = await request(app.getHttpServer())
                .post("/pedido")
                .send(pedidoData)
                .expect(201);

            const dataPedidoItem = {
                produtoId: createdProduto.id,
                valorUnitario: createdProduto.preco,
                quantidade: 3,
            };

            const responsePedidoItem = await request(app.getHttpServer())
                .post(`/pedido/${response.body.id}/pedido-item`)
                .send(dataPedidoItem)
                .expect(201);

            expect(response.body).toMatchObject({
                pessoaId: createdCliente.id,
                valorTotal: 300,
            });

            // Verifica se o pedido foi salvo no banco
            const createdPedido = await prisma.pedido.findUnique({
                where: { id: response.body.id },
                include: { itens: true },
            });

            expect(createdPedido).toBeTruthy();
            expect(createdPedido.valorTotal).toBe(300);
        });

        it("deve retornar 400 para dados inválidos", async () => {
            const invalidData = {
                pessoaId: null, // Campo inválido
                dataPedido: "",
                valorTotal: -10, // Valor inválido
                itens: [],
            };

            const response = await request(app.getHttpServer())
                .post("/pedido")
                .send(invalidData)
                .expect(400);

            expect(response.body.message).toContain(
                "pessoaId must not be empty",
            );
            expect(response.body.message).toContain(
                "valorTotal must be a positive number",
            );
        });
    });
});
