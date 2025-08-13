import { IsEnum } from 'class-validator';
import { LetterStatus } from '@prisma/client';

export class UpdateLetterDto {
  @IsEnum(LetterStatus, {
    message: 'Status deve ser QUEUED, SENT ou DELIVERED',
  })
  status: LetterStatus;
}
