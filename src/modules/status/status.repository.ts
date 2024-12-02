import { Prisma, PrismaClient } from "@prisma/client";
import { CreateStatusDto } from "./dto/create-status.dto";
import DatabaseService from "src/database/database.service";
import { ConflictException } from "@nestjs/common";
import { UpdateStatusDto } from "./dto/update-status.dto";

export default class StatusRepository {
    async create(status: CreateStatusDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        try {
            const createdStatus = await prisma.status.create({
                data: {
                    descricao: status.descricao,
                },
            });

            return createdStatus;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002"
            ) {
                throw new ConflictException("Status já existe");
            }

            throw error;
        }
    }

    async findAll() {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.status.findMany();
    }

    async findOne(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.status.findUnique({
            where: {
                id,
            },
        });
    }

    async update(id: number, status: UpdateStatusDto) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.status.update({
            where: {
                id,
            },
            data: {
                descricao: status.descricao,
            },
        });
    }

    async remove(id: number) {
        const prisma: PrismaClient = DatabaseService.getInstance();

        return prisma.status.delete({
            where: {
                id,
            },
        });
    }
}
