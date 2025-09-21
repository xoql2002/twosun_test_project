import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(data: Partial<User>) {
    const u = this.repo.create(data);
    return this.repo.save(u);
  }

  findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  findByNickname(nickname: string) {
    return this.repo.findOne({ where: { nickname } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}
