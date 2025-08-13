import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
} from 'class-validator';

export class CreatePigeonDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @IsNumber()
  @Min(0.1, { message: 'Velocidade deve ser maior que 0' })
  averageSpeed: number;
}
