import { PartialType } from "@nestjs/mapped-types";
import { CreateStatusDto } from "./create-status.dto";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateStatusDto extends PartialType(CreateStatusDto) {
    @IsNotEmpty({ message: "descricao deve ser preenchido" })
    @IsString()
    @MinLength(1, { message: "descricao deve ter pelo menos 1 caractere" })
    descricao: string;
}
