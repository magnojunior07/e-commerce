import { Test, TestingModule } from "@nestjs/testing";
import { ClienteController } from "../cliente.controller";
import { ClienteService } from "../cliente.service";
import ClienteRepository from "../cliente.repository";
import { PedidoModule } from "../../pedido/pedido.module";

describe("ClienteController", () => {
    let controller: ClienteController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ClienteController],
            imports: [PedidoModule],
            providers: [ClienteService, ClienteRepository],
        }).compile();

        controller = module.get<ClienteController>(ClienteController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
