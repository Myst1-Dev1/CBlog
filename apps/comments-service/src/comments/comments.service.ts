/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './entities/comment.entity';
import { CreateCommentDto } from './dto/createCommentDto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async createComment(data: CreateCommentDto): Promise<Comments> {
    if (!data.postId) {
      throw new RpcException('A postagem não foi informada');
    }

    try {
      const comment = this.commentsRepository.create({
        postId: data.postId,
        authorId: data.authorId,
        name: data.name,
        content: data.content,
      });

      return await this.commentsRepository.save(comment);
    } catch (error) {
      throw new RpcException(error?.message || 'Erro ao criar comentário');
    }
  }

  ping() {
    return {
      ok: true,
      service: 'posts',
      now: new Date().toISOString(),
    };
  }
}
