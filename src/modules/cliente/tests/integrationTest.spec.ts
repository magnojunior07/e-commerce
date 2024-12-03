import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../../app.module";
import DatabaseService from "../../../database/database.service";

describe("ClienteController (e2e) - Histórico de Pedidos", () => {
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
        await prisma.pedidoItem.deleteMany(); // Limpa itens do pedido
        await prisma.pedido.deleteMany(); // Limpa os pedidos
        await prisma.cliente.deleteMany(); // Limpa os clientes
        await prisma.produto.deleteMany(); // Limpa os produtos
        await app.close();
    });

    describe("GET /cliente/:id/pedidos", () => {
        let createdCliente: any;
        let createdPedidos: any[];

        beforeAll(async () => {
            // Cria um cliente para associar pedidos
            createdCliente = await prisma.cliente.create({
                data: {
                    nome: "Cliente Teste",
                    email: "cliente.teste@exemplo.com",
                    logradouro: "Rua Teste",
                    bairro: "Bairro Teste",
                    numero: "123",
                    estado: "SP",
                    cidade: "São Paulo",
                },
            });

            // Cria dois pedidos associados ao cliente
            createdPedidos = await Promise.all([
                prisma.pedido.create({
                    data: {
                        pessoaId: createdCliente.id,
                        valorTotal: 100.0,
                        statusId: 1, // Assumindo que o status com ID 1 existe
                        dataPedido: new Date(),
                    },
                }),
                prisma.pedido.create({
                    data: {
                        pessoaId: createdCliente.id,
                        valorTotal: 200.0,
                        statusId: 1,
                        dataPedido: new Date(),
                    },
                }),
            ]);
        });

        it("deve retornar o histórico de pedidos de um cliente", async () => {
            const response = await request(app.getHttpServer())
                .get(`/cliente/${createdCliente.id}/pedidos`)
                .expect(200);

            expect(response.body).toHaveLength(2);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: createdPedidos[0].id,
                        pessoaId: createdCliente.id,
                        valorTotal: createdPedidos[0].valorTotal,
                    }),
                    expect.objectContaining({
                        id: createdPedidos[1].id,
                        pessoaId: createdCliente.id,
                        valorTotal: createdPedidos[1].valorTotal,
                    }),
                ]),
            );
        });

        it("deve retornar 404 para cliente inexistente", async () => {
            const response = await request(app.getHttpServer())
                .get("/cliente/99999/pedidos") // ID inexistente
                .expect(404);

            expect(response.body.message).toContain("Cliente não encontrado");
        });
    });
});
