import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn({ comment: "댓글 고유 ID" })
  id: number;

  @Column({ comment: "댓글 내용" })
  content: string;

  @Column({ default: 0, comment: "삭제여부 0:X, 1:O" })
  isDeleted: number;

  @CreateDateColumn({ comment: "생성 일자" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "수정 일자" })
  updatedAt: Date;

  @ManyToOne(() => User, (u) => u.comments, { eager: true })
  user: User;

  @ManyToOne(() => Post, (p) => p.comments)
  post: Post;
}
