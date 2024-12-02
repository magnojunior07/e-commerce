import { Test, TestingModule } from "@nestjs/testing";
import { ProdutosController } from "../produtos.controller";
import { ProdutosService } from "../produtos.service";
import ProdutoRepository from "../produto.repository";

describe("ProdutosController", () => {
    let controller: ProdutosController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProdutosController],
            providers: [ProdutosService, ProdutoRepository],
        }).compile();

        controller = module.get<ProdutosController>(ProdutosController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
