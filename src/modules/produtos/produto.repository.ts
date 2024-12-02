import { PrismaClient } from "@prisma/client";
import DatabaseService from "src/database/database.service";
import { CreateProdutoDto } from "./dto/create-produto.dto";
import { UpdateProdutoDto } from "./dto/update-produto.dto";

export default class ProdutoRepository {
    async create(produto: CreateProdutoDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.produto.create({
            data: {
                descricao: produto.nome,
                preco: produto.preco,
                estoque: produto.estoque,
            },
        });
    }

    async findAll() {
        const prisma: PrismaClient = DatabaseService.getInstance();
        return prisma.produto.findMany();
    }

    async findOne(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();
        return prisma.produto.findUnique({ where: { id } });
    }

    async update(id: number, produto: UpdateProdutoDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.produto.update({
            where: { id },
            data: {
                descricao: produto.nome,
                preco: produto.preco,
                estoque: produto.estoque,
            },
        });
    }

    async remove(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();
        return prisma.produto.delete({ where: { id } });
    }
}
