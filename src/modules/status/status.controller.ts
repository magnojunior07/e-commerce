import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    HttpCode,
    UseFilters,
} from "@nestjs/common";
import { StatusService } from "./status.service";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Controller("status")
export class StatusController {
    constructor(private readonly statusService: StatusService) {}

    @Post()
    create(@Body() createStatusDto: CreateStatusDto) {
        return this.statusService.create(createStatusDto);
    }

    @Get()
    findAll() {
        return this.statusService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.statusService.findOne(+id);
    }

    @Patch(":id")
    @HttpCode(200)
    async update(
        @Param("id") id: string,
        @Body() updateStatusDto: UpdateStatusDto,
    ) {
        try {
            return await this.statusService.update(+id, updateStatusDto);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw error;
        }
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.statusService.remove(+id);
    }
}
