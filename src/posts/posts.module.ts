import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';
import { Like } from '../entities/like.entity';
import { Comment } from '../entities/comment.entity';
import { Retweet } from '../entities/retweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Category, Like, Comment, Retweet])],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
