import { Injectable } from "@nestjs/common";
import { CreateClienteDto } from "./dto/create-cliente.dto";
import { UpdateClienteDto } from "./dto/update-cliente.dto";
import ClienteRepository from "./cliente.repository";
import PedidoRepository from "../pedido/pedido.repository";

@Injectable()
export class ClienteService {
    constructor(
        private readonly clienteRepository: ClienteRepository,
        private readonly pedidoRepository: PedidoRepository,
    ) {}

    create(createClienteDto: CreateClienteDto) {
        return this.clienteRepository.create(createClienteDto);
    }

    findAll() {
        return this.clienteRepository.findAll();
    }

    findOne(id: number) {
        return this.clienteRepository.findOne(id);
    }

    update(id: number, updateClienteDto: UpdateClienteDto) {
        return this.clienteRepository.update(id, updateClienteDto);
    }

    remove(id: number) {
        return this.clienteRepository.remove(id);
    }

    findPedidos(id: number) {
        return this.pedidoRepository.findPedidosByCliente(id);
    }
}
