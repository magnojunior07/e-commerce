import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StatusModule } from "./modules/status/status.module";
import { ClienteModule } from "./modules/cliente/cliente.module";
import { PedidoModule } from "./modules/pedido/pedido.module";

@Module({
    imports: [StatusModule, ClienteModule, PedidoModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
