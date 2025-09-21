import {Injectable, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Post} from "../entities/post.entity";
import {Retweet} from "../entities/retweet.entity";

@Injectable()
export class RetweetsService {
  constructor(@InjectRepository(Retweet) private repo: Repository<Retweet>
      , @InjectRepository(Post) private readonly postRepo: Repository<Post>
  ) {}
}
