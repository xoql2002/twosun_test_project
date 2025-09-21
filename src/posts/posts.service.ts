import {Injectable, NotFoundException, ForbiddenException, HttpException, BadRequestException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {Category} from "../entities/category.entity";

interface ListQueryDto {
  page?: number;
  limit?: number;
  sort?: 'asc' | 'desc';
  categoryId?: number;
}

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>
              , @InjectRepository(Category) private readonly categoryRepo: Repository<Category>) {}

  async findAll({ page = 1, limit = 10, sort = 'desc', categoryId }: ListQueryDto) {
    const qb = this.repo.createQueryBuilder('post')
        .select([
            'post.id'
            , 'post.content'
            , 'post.imageUrls'
            , 'post.createdAt'
            , 'user.nickname'
            , 'user.profileImageUrl'
            , 'category.id'
            , 'category.name'
        ])
        .innerJoin('post.user', 'user')
        .innerJoin('post.category', 'category')
        .loadRelationCountAndMap('post.likeCount', 'post.likes'
            , 'like'
            , qb => qb.andWhere('like.isLike = :isLike', { isLike: 1 })
                .andWhere('like.isDeleted = :isDeleted', { isDeleted: 0 })
        )
        .loadRelationCountAndMap('post.commentCount', 'post.comments'
            , 'comment', qb => qb.andWhere('comment.isDeleted = :isDeleted', { isDeleted: 0 }))
        .loadRelationCountAndMap('post.retweetCount', 'post.retweets'
            , 'retweet', qb => qb.andWhere('retweet.isDeleted = :isDeleted', { isDeleted: 0 }))
        .where('post.isDeleted = :isDeleted', { isDeleted: 0 });

    if (categoryId) qb.andWhere('category.id = :categoryId', { categoryId: categoryId });

    qb.orderBy('post.createdAt', sort.toUpperCase() as any)
        .skip((page - 1) * limit)
        .distinct(true)
        .take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {success: true, data: {items, total, page, limit}};
  }

  async findOne(id: number) {
    const result = await this.repo.findOne({ where: { id, isDeleted: 0 } });
    if (!result) throw new NotFoundException('존재하지 않는 게시물입니다.');

    return {success: true, data: result};
  }

  async create(data: Partial<Post>) {
    const category = await this.categoryRepo.findOne({ where: { id: data.category.id } });
    if (!category) throw new NotFoundException('존재하지 않는 카테고리입니다.');
    const p = this.repo.create(data);
    const result = await this.repo.save(p);

    return {success: true, data: result};
  }

  async update(data: Partial<Post>) {
    const p = await this.repo.findOne({ where: { id: data.id, isDeleted: 0 }, relations: ['user']});
    if (!p) throw new NotFoundException('존재하지 않는 게시물입니다.');
    if (p.user.id !== data.user.id) throw new ForbiddenException('등록한 사용자가 아닙니다.');
    p.content = data.content;
    const result = await this.repo.save(p);

    return {success: true, data: result};
  }

  async delete(data: Partial<Post>) {
    const p = await this.repo.findOne({ where: { id: data.id, isDeleted: 0 }, relations: ['user']});
    if (!p) throw new NotFoundException('존재하지 않는 게시물입니다.');
    if (p.user.id !== data.user.id) throw new ForbiddenException('등록한 사용자가 아닙니다.');
    p.isDeleted = 1;
    const result = await this.repo.save(p);

    return {success: true, data: result};
  }
}
