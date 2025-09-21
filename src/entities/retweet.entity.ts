import {Entity, PrimaryGeneratedColumn, ManyToOne, Unique, CreateDateColumn, UpdateDateColumn, Column} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
@Unique(['user','post'])
export class Retweet {
  @PrimaryGeneratedColumn({ comment: "리트윗 고유 ID" })
  id: number;

  @Column({ default: 0, comment: "삭제여부 0:X, 1:O" })
  isDeleted: number;

  @CreateDateColumn({ comment: "생성 일자" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "수정 일자" })
  updatedAt: Date;

  @ManyToOne(() => User, (u) => u.retweets, { eager: true })
  user: User;

  @ManyToOne(() => Post, (p) => p.retweets)
  post: Post;
}
