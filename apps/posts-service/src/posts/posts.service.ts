import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPostDto';
import { RpcException } from '@nestjs/microservices';
import { UpdatePostDto } from './dto/updatePostDto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
  ) {}

  async createNewPost(data: CreatePostDto): Promise<Posts> {
    if (!data.authorId) {
      throw new RpcException('Id do autor é obrigatório');
    }

    try {
      const post = this.postsRepository.create(data);
      return await this.postsRepository.save(post);
    } catch (error) {
      return this.handleRpcError(error, 'Erro ao cria o post');
    }
  }

  async getAllPosts(): Promise<Posts[]> {
    try {
      return await this.postsRepository.find({
        select: [
          'id',
          'authorId',
          'title',
          'category',
          'description',
          'postImageUrl',
        ],
      });
    } catch (error) {
      return this.handleRpcError(
        error,
        'Erro ao pegar os dados de todos os posts',
      );
    }
  }

  async getPostById(id: number): Promise<Posts> {
    try {
      const post = await this.postsRepository.findOneBy({ id });
      if (!post) {
        throw new RpcException(`O post de id ${id} não foi encontrado`);
      }
      return post;
    } catch (error) {
      return this.handleRpcError(error, 'Erro ao pegar os dados do post');
    }
  }

  async updatePost(id: number, update: UpdatePostDto): Promise<Posts> {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new RpcException('Post não encontrado');
    }

    Object.assign(post, update);

    return this.postsRepository.save(post);
  }

  async deletePost(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) {
      throw new RpcException(`O post de id ${id} não foi encontrado`);
    }

    await this.postsRepository.remove(post);

    return post;
  }

  ping() {
    return {
      ok: true,
      service: 'posts',
      now: new Date().toISOString(),
    };
  }

  private handleRpcError(error: unknown, fallback: string): never {
    if (error instanceof RpcException) {
      throw error;
    }

    throw new RpcException(error instanceof Error ? error.message : fallback);
  }
}
