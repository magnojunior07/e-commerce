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
        await app.close();
    });

    describe("GET /cliente/:id/pedidos", () => {
        let createdCliente: any;
        let createdPedidos: any[];
        let createdStatus: any;
        let createdProduto: any;
        beforeAll(async () => {
            // Cria um cliente para associar pedidos
            createdCliente = await prisma.cliente.create({
                data: {
                    nome: "Cliente Teste",
                    email: "cliente.teste2@exemplo.com",
                    logradouro: "Rua Teste",
                    bairro: "Bairro Teste",
                    numero: "123",
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

            // Cria dois pedidos associados ao cliente
            createdPedidos = await prisma.pedido.createManyAndReturn({
                data: {
                    pessoaId: createdCliente.id,
                    statusId: createdStatus.id,
                    valorTotal: createdProduto.preco,
                },
            });

            createdPedidos.forEach(async (pedido) => {
                await prisma.pedidoItem.createMany({
                    data: [
                        {
                            pedidoId: pedido.id,
                            produtoId: createdProduto.id,
                            valorUnitario: createdProduto.preco,
                            quantidade: 1,
                        },
                    ],
                });
            });
        });

        it("deve retornar o histórico de pedidos de um cliente", async () => {
            const response = await request(app.getHttpServer())
                .get(`/cliente/${createdCliente.id}/pedidos`)
                .expect(200);

            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: createdPedidos[0].id,
                        pessoaId: createdCliente.id,
                        valorTotal: createdPedidos[0].valorTotal,
                    }),
                ]),
            );
        });
    });
});
