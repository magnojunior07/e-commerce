import { Module } from "@nestjs/common";
import { ClienteService } from "./cliente.service";
import { ClienteController } from "./cliente.controller";
import { PedidoModule } from "../pedido/pedido.module";
import ClienteRepository from "./cliente.repository";

@Module({
    controllers: [ClienteController],
    providers: [ClienteService, ClienteRepository],
    imports: [PedidoModule],
})
export class ClienteModule {}
