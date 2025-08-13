import { IsString, IsNotEmpty, IsEmail, IsDateString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email: string;

  @IsDateString(
    {},
    { message: 'Data de nascimento deve estar no formato YYYY-MM-DD' },
  )
  birthDate: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
