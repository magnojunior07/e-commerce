import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import StatusRepository from "./status.repository";

@Injectable()
export class StatusService {
    constructor(private readonly statusRepository: StatusRepository) {}

    create(createStatusDto: CreateStatusDto) {
        return this.statusRepository.create(createStatusDto);
    }

    findAll() {
        return this.statusRepository.findAll();
    }

    findOne(id: number) {
        return this.statusRepository.findOne(id);
    }

    async update(id: number, updateStatusDto: UpdateStatusDto) {
        const status = await this.statusRepository.findOne(id);

        if (!status) {
            throw new NotFoundException("Registro não encontrado");
        }

        return this.statusRepository.update(id, updateStatusDto);
    }

    remove(id: number) {
        return this.statusRepository.remove(id);
    }
}
