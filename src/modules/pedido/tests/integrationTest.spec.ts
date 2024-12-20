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

        await app.init();
    });

    afterAll(async () => {
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
                    email: "cliente@teste2.com",
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

            expect(responsePedidoItem.body).toMatchObject({
                pedidoId: response.body.id,
                produtoId: createdProduto.id,
                valorUnitario: createdProduto.preco,
                quantidade: 3,
            });

            expect(response.body).toMatchObject({
                pessoaId: createdCliente.id,
            });

            // Verifica se o pedido foi salvo no banco

            const createdPedidoItem = await prisma.pedidoItem.findUnique({
                where: { id: responsePedidoItem.body.id },
            });

            expect(createdPedidoItem.pedidoId).toBe(response.body.id);
        });
    });
});
