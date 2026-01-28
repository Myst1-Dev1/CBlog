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
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(@Body() body: createComment): Promise<any> {
    return firstValueFrom(this.commentsClient.send('comments.create', body));
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
