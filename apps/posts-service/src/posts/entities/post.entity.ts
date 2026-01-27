import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column({ unique: true })
  title: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  postImageUrl?: string;
}
