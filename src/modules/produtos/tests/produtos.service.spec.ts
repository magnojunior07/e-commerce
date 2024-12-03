import { Test, TestingModule } from "@nestjs/testing";
import { ProdutosService } from "../produtos.service";
import ProdutoRepository from "../produto.repository";

describe("ProdutosService", () => {
    let service: ProdutosService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProdutosService, ProdutoRepository],
        }).compile();

        service = module.get<ProdutosService>(ProdutosService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
