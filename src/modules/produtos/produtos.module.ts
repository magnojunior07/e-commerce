import { Module } from "@nestjs/common";
import { ProdutosService } from "./produtos.service";
import { ProdutosController } from "./produtos.controller";
import ProdutoRepository from "./produto.repository";

@Module({
    controllers: [ProdutosController],
    providers: [ProdutosService, ProdutoRepository],
    exports: [ProdutoRepository, ProdutosService],
})
export class ProdutosModule {}
