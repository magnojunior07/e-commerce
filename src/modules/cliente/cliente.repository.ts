import { Prisma, PrismaClient } from "@prisma/client";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import DatabaseService from "src/database/database.service";
import { ConflictException } from "@nestjs/common";
import { UpdateClienteDto } from "./dto/update-cliente.dto";

export default class ClienteRepository {
    async create(cliente: CreateClienteDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        try {
            const createdCliente = await prisma.cliente.create({
                data: {
                    nome: cliente.nome,
                    email: cliente.email,
                    logradouro: cliente.logradouro,
                    bairro: cliente.bairro,
                    numero: cliente.numero,
                    estado: cliente.estado,
                    cidade: cliente.cidade,
                },
            });

            return createdCliente;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new ConflictException("Cliente já existe");
            }

            throw error;
        }
    }

    async findAll() {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.cliente.findMany();
    }

    async findOne(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.cliente.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: number, cliente: UpdateClienteDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.cliente.update({
            where: {
                id,
            },
            data: {
                nome: cliente.nome,
                email: cliente.email,
                logradouro: cliente.logradouro,
                bairro: cliente.bairro,
                numero: cliente.numero,
                estado: cliente.estado,
                cidade: cliente.cidade,
            },
        });
    }

    async remove(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.cliente.delete({
            where: {
                id,
            },
        });
    }
}
