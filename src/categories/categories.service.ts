import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Category} from "../entities/category.entity";

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async findAll(orderBy: keyof Category = 'id', order: 'ASC' | 'DESC' = 'ASC') {
    const result = await this.repo.find({select: {id: true, name: true}
      , where: {isDeleted: 0}, order: {[orderBy]: order}});
    return {success: true, data: {items: result}};
  }
}
