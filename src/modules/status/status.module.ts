import { Module } from "@nestjs/common";
import { StatusService } from "./status.service";
import { StatusController } from "./status.controller";
import StatusRepository from "./status.repository";

@Module({
    controllers: [StatusController],
    providers: [StatusService, StatusRepository],
    exports: [StatusRepository, StatusService],
})
export class StatusModule {}
