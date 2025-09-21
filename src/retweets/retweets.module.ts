import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RetweetsService } from './retweets.service';
import { RetweetsController } from './retweets.controller';
import { Retweet } from '../entities/retweet.entity';
import { Post } from '../entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Retweet, Post])],
  providers: [RetweetsService],
  controllers: [RetweetsController],
})
export class RetweetsModule {}
