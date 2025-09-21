import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Category } from './entities/category.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Like } from './entities/like.entity';
import { Retweet } from './entities/retweet.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { LikesModule } from './likes/likes.module';
import { RetweetsModule } from './retweets/retweets.module';

import config from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({ ...config }),
    }),
    TypeOrmModule.forFeature([User, Category, Post, Comment, Like, Retweet]),
    AuthModule,
    UsersModule,
    CategoriesModule,
    PostsModule,
    LikesModule,
    RetweetsModule
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
