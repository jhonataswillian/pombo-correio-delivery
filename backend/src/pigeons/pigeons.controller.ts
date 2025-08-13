import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PigeonsService } from './pigeons.service';
import { CreatePigeonDto } from './dto/create-pigeon.dto';
import { UpdatePigeonDto } from './dto/update-pigeon.dto';

@Controller('pigeons')
export class PigeonsController {
  constructor(private readonly pigeonsService: PigeonsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPigeonDto: CreatePigeonDto) {
    return this.pigeonsService.create(createPigeonDto);
  }

  @Get()
  findAll() {
    return this.pigeonsService.findAll();
  }

  @Get('all')
  findAllIncludingRetired() {
    return this.pigeonsService.findAllIncludingRetired();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pigeonsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePigeonDto: UpdatePigeonDto) {
    return this.pigeonsService.update(id, updatePigeonDto);
  }

  @Patch(':id/retire')
  @HttpCode(HttpStatus.OK)
  retire(@Param('id') id: string) {
    return this.pigeonsService.retire(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // Não implementamos delete físico, apenas aposentadoria
    return this.retire(id);
  }
}
