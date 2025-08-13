import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LettersService } from './letters.service';
import { CreateLetterDto } from './dto/create-letter.dto';
import { UpdateLetterDto } from './dto/update-letter.dto';
import { LetterStatus } from '@prisma/client';

@Controller('letters')
export class LettersController {
  constructor(private readonly lettersService: LettersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLetterDto: CreateLetterDto) {
    return this.lettersService.create(createLetterDto);
  }

  @Get()
  findAll() {
    return this.lettersService.findAll();
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: LetterStatus) {
    return this.lettersService.findByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lettersService.findOne(id);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  updateStatus(
    @Param('id') id: string,
    @Body() updateLetterDto: UpdateLetterDto,
  ) {
    return this.lettersService.updateStatus(id, updateLetterDto);
  }

  // Não implementamos update completo ou delete - apenas mudança de status
  // conforme as regras de negócio do enunciado
}
