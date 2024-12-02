import { Prisma, PrismaClient } from "@prisma/client";
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import DatabaseService from "../../database/database.service";
import { ConflictException } from "@nestjs/common";
import { UpdatePedidoDto } from "./dto/update-pedido.dto";
import { CreatePedidoItemDto } from "./dto/create-pedido-item.dto";

export default class PedidoRepository {
    async create(pedido: CreatePedidoDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        try {
            const createdPedido = await prisma.pedido.create({
                data: {
                    pessoaId: pedido.pessoaId,
                    statusId: pedido.statusId,
                    valorTotal: 0,
                },
            });

            return createdPedido;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new ConflictException("Pedido já existe");
            }

            throw error;
        }
    }

    async findAll() {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.pedido.findMany({
            select: {
                id: true,
                pessoaId: true,
                statusId: true,
                valorTotal: true,
                itens: {
                    select: {
                        id: true,
                        produtoId: true,
                        quantidade: true,
                        valorUnitario: true,
                    },
                },
            },
        });
    }

    async findOne(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.pedido.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                pessoaId: true,
                statusId: true,
                valorTotal: true,
                itens: {
                    select: {
                        id: true,
                        produtoId: true,
                        quantidade: true,
                        valorUnitario: true,
                    },
                },
            },
        });
    }

    async findPedidosByCliente(clienteId: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.pedido.findMany({
            where: {
                pessoaId: clienteId,
            },
            select: {
                id: true,
                pessoaId: true,
                statusId: true,
                valorTotal: true,
                itens: {
                    select: {
                        id: true,
                        produtoId: true,
                        quantidade: true,
                        valorUnitario: true,
                    },
                },
            },
        });
    }

    async update(id: number, pedido: UpdatePedidoDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.pedido.update({
            where: {
                id,
            },
            data: {
                pessoaId: pedido.pessoaId,
                statusId: pedido.statusId,
                valorTotal: pedido.valorTotal,
            },
        });
    }

    async remove(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.pedido.delete({
            where: {
                id,
            },
        });
    }

    async createPedidoItem(id: number, pedidoItem: CreatePedidoItemDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.pedidoItem.create({
            data: {
                pedidoId: id,
                produtoId: pedidoItem.produtoId,
                quantidade: pedidoItem.quantidade,
                valorUnitario: pedidoItem.valorUnitario,
            },
        });
    }
}
