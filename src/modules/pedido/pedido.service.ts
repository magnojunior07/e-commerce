import { Injectable } from "@nestjs/common";
import { CreatePedidoDto } from "./dto/create-pedido.dto";
import { UpdatePedidoDto } from "./dto/update-pedido.dto";
import PedidoRepository from "./pedido.repository";
import { CreatePedidoItemDto } from "./dto/create-pedido-item.dto";

@Injectable()
export class PedidoService {
    constructor(private readonly pedidoRepository: PedidoRepository) {}

    async create(createPedidoDto: CreatePedidoDto) {
        return this.pedidoRepository.create(createPedidoDto);
    }

    async findAll() {
        return this.pedidoRepository.findAll();
    }

    async findOne(id: number) {
        return this.pedidoRepository.findOne(id);
    }

    async update(id: number, updatePedidoDto: UpdatePedidoDto) {
        return this.pedidoRepository.update(id, updatePedidoDto);
    }

    async remove(id: number) {
        return this.pedidoRepository.remove(id);
    }

    async createPedidoItem(
        id: number,
        createPedidoItemDto: CreatePedidoItemDto,
    ) {
        const pedido = await this.pedidoRepository.findOne(id);
        pedido.valorTotal +=
            createPedidoItemDto.valorUnitario * createPedidoItemDto.quantidade;

        await this.pedidoRepository.update(id, {
            valorTotal: pedido.valorTotal,
        });

        return this.pedidoRepository.createPedidoItem(id, createPedidoItemDto);
    }
}
