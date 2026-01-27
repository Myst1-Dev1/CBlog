import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsString()
  @MinLength(6, {
    message: 'O titulo da postagem deve te no minimo 6 caracteres',
  })
  title: string;

  @IsString()
  category: string;

  @IsString()
  @MinLength(6, {
    message: 'A descrição da postagem deve te no minimo 6 caracteres',
  })
  description: string;

  @IsString()
  @IsOptional()
  postImageUrl: string;
}
