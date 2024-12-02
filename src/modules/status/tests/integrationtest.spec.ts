import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../../app.module";
import DatabaseService from "../../../database/database.service";

describe("StatusController (e2e)", () => {
    let app: INestApplication;
    let prisma = DatabaseService.getInstance();

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule], // Importe o módulo principal da aplicação
        }).compile();

        app = moduleFixture.createNestApplication();

        await app.init();
    });

    afterAll(async () => {
        await prisma.status.deleteMany(); // Limpa os registros criados durante os testes
        await app.close();
    });

    describe("PATCH /status/:id", () => {
        let createdStatus: any;

        beforeAll(async () => {
            // Cria um registro inicial para testar a atualização
            createdStatus = await prisma.status.create({
                data: { descricao: "Status Inicial" },
            });
        });

        it("deve atualizar o status com sucesso", async () => {
            const updatedData = { descricao: "Status Atualizado" };

            const response = await request(app.getHttpServer())
                .patch(`/status/${createdStatus.id}`)
                .send(updatedData)
                .expect(200);

            expect(response.body).toMatchObject({
                id: createdStatus.id,
                descricao: "Status Atualizado",
            });

            const updatedStatus = await prisma.status.findUnique({
                where: { id: createdStatus.id },
            });

            expect(updatedStatus).toMatchObject(updatedData);
        });

        it("deve retornar 404 para um id inválido", async () => {
            const response = await request(app.getHttpServer())
                .patch("/status/9999") // ID inexistente
                .send({ descricao: "Novo Status" })
                .expect(404);

            expect(response.body.message).toEqual("Registro não encontrado");
        });

        it("deve retornar 400 para dados inválidos", async () => {
            const response = await request(app.getHttpServer())
                .patch(`/status/${createdStatus.id}`)
                .send({ descricao: "" }) // Descrição vazia
                .expect(400);

            expect(response.body.message).toContain(
                "descricao deve ser preenchido",
            );
        });
    });
});
