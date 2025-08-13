import { PartialType } from '@nestjs/mapped-types';
import { CreatePigeonDto } from './create-pigeon.dto';

export class UpdatePigeonDto extends PartialType(CreatePigeonDto) {}
