import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './entities/comment.entity';
import { CreateCommentDto } from './dto/createCommentDto';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
    @Inject('EVENT_BUS') private readonly eventClient: ClientProxy,
  ) {}

  async createComment(data: CreateCommentDto): Promise<Comments> {
    if (!data.postId) {
      throw new RpcException('A postagem não foi encontrada');
    }

    console.log('EVENT BUS:', this.eventClient);

    const comment = await this.commentsRepository.save(data);

    this.eventClient.emit('comment.created', {
      postAuthorId: data.authorId,
      commenterName: data.name,
      postId: data.postId,
      commentId: comment.id,
    });

    return comment;
  }

  async getAllComments(postId: number | string): Promise<Comments[]> {
    const id = Number(postId);

    if (Number.isNaN(id)) {
      throw new RpcException('postId inválido');
    }

    return this.commentsRepository.find({
      where: { postId: id },
      order: { createdAt: 'ASC' },
    });
  }

  ping() {
    return {
      ok: true,
      service: 'comments',
      now: new Date().toISOString(),
    };
  }
}
