import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // 프로필 조회
  @Get(':id')
  @ApiOperation({ summary: '프로필 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 404, description: '잘못된 정보' })
  async profile(@Param('id') id: number)  {
    const user = await this.usersService.findById(Number(id));
    if (!user) throw new NotFoundException('존재하지 않는 사용자입니다.');
    return {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      profileImageUrl: user.profileImageUrl,
      createdAt: user.createdAt
    };
  }
}
