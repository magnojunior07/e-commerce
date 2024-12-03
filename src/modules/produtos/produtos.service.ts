import { Injectable } from "@nestjs/common";
import { CreateProdutoDto } from "./dto/create-produto.dto";
import { UpdateProdutoDto } from "./dto/update-produto.dto";
import ProdutoRepository from "./produto.repository";

@Injectable()
export class ProdutosService {
    constructor(private readonly produtoRepository: ProdutoRepository) {}

    create(createProdutoDto: CreateProdutoDto) {
        return this.produtoRepository.create(createProdutoDto);
    }

    findAll() {
        return this.produtoRepository.findAll();
    }

    findOne(id: number) {
        return this.produtoRepository.findOne(id);
    }

    update(id: number, updateProdutoDto: UpdateProdutoDto) {
        return this.produtoRepository.update(id, updateProdutoDto);
    }

    remove(id: number) {
        return this.produtoRepository.remove(id);
    }
}
