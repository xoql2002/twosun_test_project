import {Entity, PrimaryGeneratedColumn, ManyToOne, Unique, CreateDateColumn, UpdateDateColumn, Column} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
@Unique(['user','post'])
export class Like {
  @PrimaryGeneratedColumn({ comment: "좋아요 고유 ID" })
  id: number;

  @Column({ default: 1, comment: "좋아요여부 0:X, 1:O" })
  isLike: number;

  @Column({ default: 0, comment: "삭제여부 0:X, 1:O" })
  isDeleted: number;

  @CreateDateColumn({ comment: "생성 일자" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "수정 일자" })
  updatedAt: Date;

  @ManyToOne(() => User, (u) => u.likes, { eager: true })
  user: User;

  @ManyToOne(() => Post, (p) => p.likes)
  post: Post;
}
