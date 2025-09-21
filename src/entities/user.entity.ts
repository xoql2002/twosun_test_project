import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn} from 'typeorm';
import { Post } from './post.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { Retweet } from './retweet.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: "사용자 고유 ID" })
  id: number;

  @Column({ unique: true, comment: "로그인 ID" })
  username: string;

  @Column({ comment: "이름" })
  name: string;

  @Column({ unique: true, comment: "닉네임" })
  nickname: string;

  @Exclude()
  @Column({ comment: "비밀번호" })
  password: string;

  @Column({ nullable: true, comment: "프로필 이미지 URL" })
  profileImageUrl: string;

  @Column({ default: 0, comment: "삭제여부 0:X, 1:O" })
  isDeleted: number;

  @CreateDateColumn({ comment: "생성일자" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "수정일자" })
  updatedAt: Date;

  @OneToMany(() => Post, (p) => p.user)
  posts: Post[];

  @OneToMany(() => Like, (l) => l.user)
  likes: Like[];

  @OneToMany(() => Comment, (c) => c.user)
  comments: Comment[];

  @OneToMany(() => Retweet, (r) => r.user)
  retweets: Retweet[];
}
