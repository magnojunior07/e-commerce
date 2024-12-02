import { Test, TestingModule } from "@nestjs/testing";
import { PedidoController } from "../pedido.controller";
import { PedidoService } from "../pedido.service";
import PedidoRepository from "../pedido.repository";

describe("PedidoController", () => {
    let controller: PedidoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PedidoController],
            providers: [PedidoService, PedidoRepository],
        }).compile();

        controller = module.get<PedidoController>(PedidoController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
