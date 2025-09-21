import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ comment: "카테고리 고유 ID" })
  id: number;

  @Column({ unique: true, comment: "카테고리 이름" })
  name: string;

  @Column({ default: 0, comment: "삭제여부 0:X, 1:O" })
  isDeleted: number;

  @CreateDateColumn({ comment: "생성 일자" })
  createdAt: Date;

  @UpdateDateColumn({ comment: "수정 일자" })
  updatedAt: Date;
  
  @OneToMany(() => Post, (p) => p.category)
  posts: Post[];
}
