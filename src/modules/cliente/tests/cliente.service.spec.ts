import { Test, TestingModule } from "@nestjs/testing";
import { ClienteService } from "../cliente.service";
import ClienteRepository from "../cliente.repository";
import { PedidoModule } from "../../pedido/pedido.module";

describe("ClienteService", () => {
    let service: ClienteService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PedidoModule],
            providers: [ClienteService, ClienteRepository],
        }).compile();

        service = module.get<ClienteService>(ClienteService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
