import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StatusModule } from "./modules/status/status.module";
import { ProdutosModule } from "./modules/produtos/produtos.module";

@Module({
    imports: [StatusModule, ProdutosModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
