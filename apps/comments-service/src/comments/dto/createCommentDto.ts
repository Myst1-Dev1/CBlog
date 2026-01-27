import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsString()
  @Min(3, { message: 'O nome deve ter no minimo 3 caracteres' })
  name: string;

  @IsString()
  @Min(3, { message: 'O comentário deve ter no minimo 3 caracteres' })
  content: string;
}
