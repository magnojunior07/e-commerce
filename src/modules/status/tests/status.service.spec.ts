import { Test, TestingModule } from "@nestjs/testing";
import { StatusService } from "../status.service";
import StatusRepository from "../status.repository";

describe("StatusService", () => {
    let service: StatusService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StatusService, StatusRepository],
        }).compile();

        service = module.get<StatusService>(StatusService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
