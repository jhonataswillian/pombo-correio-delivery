import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLetterDto {
  @IsString()
  @IsNotEmpty({ message: 'Conteúdo da carta é obrigatório' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do destinatário é obrigatório' })
  recipientName: string;

  @IsString()
  @IsNotEmpty({ message: 'Endereço do destinatário é obrigatório' })
  recipientAddress: string;

  @IsString()
  @IsNotEmpty({ message: 'ID do remetente é obrigatório' })
  senderId: string;

  @IsString()
  @IsNotEmpty({ message: 'ID do pombo é obrigatório' })
  pigeonId: string;

  // Status será sempre QUEUED na criação - não permitimos definir na criação
}
