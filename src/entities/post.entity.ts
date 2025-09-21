import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';
import { Retweet } from './retweet.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn({ comment: "게시물 고유 ID" })
  id: number;

  @Column({ length: 280, comment: "게시물 내용" })
  content: string;

  @Column('simple-array', { nullable: true, comment: "게시물 이미지 URL" })
  imageUrls: string[];

  @Column({ default: 0, comment: "삭제여부 0:X, 1:O" })
  isDeleted: number;

  @CreateDateColumn({ comment: "생성 일자" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "수정 일자" })
  updatedAt: Date;

  @ManyToOne(() => User, (u) => u.posts, { eager: true })
  user: User;

  @ManyToOne(() => Category, (c) => c.posts, { eager: true })
  category: Category;

  @OneToMany(() => Comment, (c) => c.post)
  comments: Comment[];

  @OneToMany(() => Like, (l) => l.post)
  likes: Like[];

  @OneToMany(() => Retweet, (r) => r.post)
  retweets: Retweet[];
}
