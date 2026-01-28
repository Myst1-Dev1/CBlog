import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notifications')
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number; // quem vai receber

  @Column()
  type: string; // COMMENT, LIKE, SYSTEM...

  @Column()
  message: string;

  @Column({ type: 'json', nullable: true })
  metadata?: Record<string, any>;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
