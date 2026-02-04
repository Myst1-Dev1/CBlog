import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

type createComment = {
  postAuthorId: number;
  postId: number;
  authorId: number;
  name: string;
  content: string;
};

@Controller('comments')
export class CommentsController {
  constructor(
    @Inject('COMMENTS_CLIENT')
    private readonly commentsClient: ClientProxy,

    @Inject('POSTS_CLIENT') private readonly postsClient: ClientProxy
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(@Body() body: createComment) {
    const post = await firstValueFrom(
      this.postsClient.send('posts.findById', {
        id: Number(body.postId),
      }),
    );

    const payload = {
      postId: Number(body.postId),
      content: body.content,
      name: body.name,
      authorId: body.authorId,      
      postAuthorId: Number(post.authorId) 
    };

    console.log('PAYLOAD ENVIADO:', payload);

    return firstValueFrom(
      this.commentsClient.send('comments.create', payload),
    );
  }

  @Get('/:postId')
  async getComments(@Param('postId') postId: string): Promise<any> {
    return firstValueFrom(
      this.commentsClient.send('comments.getAll', {
        postId: Number(postId),
      }),
    );
  }
}
