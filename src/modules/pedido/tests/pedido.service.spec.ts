import { Test, TestingModule } from "@nestjs/testing";
import { PedidoService } from "../pedido.service";
import PedidoRepository from "../pedido.repository";

describe("PedidoService", () => {
    let service: PedidoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PedidoService, PedidoRepository],
        }).compile();

        service = module.get<PedidoService>(PedidoService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
