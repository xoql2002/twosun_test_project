import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;
    const ok = await bcrypt.compare(pass, user.password);
    if (ok) return user;
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, username: user.username, nickname: user.nickname, profileImageUrl: user.profileImageUrl };
    const access_token = this.jwtService.sign(payload);
    return {success: true, data: {access_token: access_token}};
  }

  async register(dto: any) {
    const result =  await this.usersService.create(dto);
    return {success: true, data: result};
  }
}
