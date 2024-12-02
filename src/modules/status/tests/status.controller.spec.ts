import { Test, TestingModule } from "@nestjs/testing";
import { StatusController } from "../status.controller";
import { StatusService } from "../status.service";
import StatusRepository from "../status.repository";

describe("StatusController", () => {
    let controller: StatusController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StatusController],
            providers: [StatusService, StatusRepository],
        }).compile();

        controller = module.get<StatusController>(StatusController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
