import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutosDto } from './create-produtos.dto';

export class UpdateProdutosDto extends PartialType(CreateProdutosDto) {}
