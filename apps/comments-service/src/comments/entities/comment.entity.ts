import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postId: number;

  @Column()
  postAuthorId: number;

  @Column()
  authorId: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
