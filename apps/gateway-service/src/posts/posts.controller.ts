/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ImageUploadInterceptor } from 'src/interceptors/image-upload-interceptor';

type CreatePostHttpDto = {
  authorId: number;
  title: string;
  description: string;
  category: string;
};

type UpdatePostHttpDto = {
  authorId: number;
  title?: string;
  description?: string;
  category?: string;
};

@Controller('posts')
export class PostsController {
  constructor(
    @Inject('POSTS_CLIENT') private readonly postsClient: ClientProxy,
    @Inject('MEDIA_CLIENT') private readonly mediaClient: ClientProxy,
  ) {}

  @UseInterceptors(ImageUploadInterceptor('postImageUrl', 5))
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    body: CreatePostHttpDto,
  ) {
    try {
      let postImageUrl = '';

      if (file) {
        console.log('Arquivo recebido:', file.originalname);
        const uploadResult = await firstValueFrom(
          this.mediaClient.send('media.uploadImage', {
            base64: file.buffer.toString('base64'),
            mimeType: file.mimetype,
            fileName: file.originalname,
          }),
        ).catch((err) => {
          console.error('Falha na comunicação com Media Service:', err);
          throw new BadRequestException('Falha ao processar imagem');
        });

        postImageUrl = uploadResult.url;
      }

      return firstValueFrom(
        this.postsClient.send('posts.create', {
          ...body,
          postImageUrl,
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(`Erro no createNewPost ${error}`);
    }
  }

  @UseInterceptors(ImageUploadInterceptor('postImageUrl', 5))
  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body()
    body: UpdatePostHttpDto,
  ) {
    try {
      let postImageUrl: string | undefined;

      if (file) {
        const uploadResult = await firstValueFrom(
          this.mediaClient.send('media.uploadImage', {
            base64: file.buffer.toString('base64'),
            mimeType: file.mimetype,
            fileName: file.originalname,
          }),
        );

        postImageUrl = uploadResult.url;
      }

      return firstValueFrom(
        this.postsClient.send('posts.update', {
          id: Number(id),
          update: {
            ...body,
            ...(postImageUrl && { postImageUrl }),
          },
        }),
      );
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao atualizar post');
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id') id: string) {
    return await firstValueFrom(
      this.postsClient.send('posts.delete', Number(id)),
    );
  }

  @Get()
  async getPosts() {
    return await firstValueFrom(this.postsClient.send('posts.findAll', {}));
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsClient.send('posts.findById', {
      id: Number(id),
    });
  }
}
