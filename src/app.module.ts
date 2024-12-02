import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StatusModule } from "./modules/status/status.module";

@Module({
    imports: [StatusModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
