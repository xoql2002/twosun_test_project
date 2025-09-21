import {Injectable, NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Like} from "../entities/like.entity";
import {Post} from "../entities/post.entity";

@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private repo: Repository<Like>
      , @InjectRepository(Post) private readonly postRepo: Repository<Post>
  ) {}

  async update(data: Partial<Like>) {
    const p = await this.postRepo.findOne({where: {id: data.post.id, isDeleted: 0}});
    if (!p) throw new NotFoundException('존재하지 않는 게시물입니다.');

    let l = await this.repo.findOne({where: { user: {id :data.user.id}, post: {id :data.post.id}, isDeleted: 0 }
      , relations: ['user', 'post']});

    if (!l) {
      l = this.repo.create(data);
      l.isLike = 1;
      l.post.id = data.post.id;
    }else{
      l.isLike = l.isLike == 1 ? 0 : 1;
    }

    await this.repo.save(l);
    return {success: true, data: {isLike : l.isLike}};
  }
}
