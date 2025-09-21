import {Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseGuards, UseInterceptors} from '@nestjs/common';
import { LikesService } from './likes.service';
import {AuthGuard} from "@nestjs/passport";
import {IsInt, IsNotEmpty} from "class-validator";
import {ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiUnauthorizedResponse} from "@nestjs/swagger";

class LikeDto {
  @ApiProperty({example: 1, description: '게시물 고유 ID(숫자)' })
  @IsNotEmpty({ message: '게시물을 선택해주세요.' })
  @IsInt({ message: '올바른 게시물 ID 형식이 아닙니다.(숫자)' })
  postId: number;
}

@UseInterceptors(ClassSerializerInterceptor)
@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  // 게시물 좋아요 기능
  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({ description: '인증 실패(Unauthorized)' })
  @ApiOperation({ summary: '게시물 좋아요 등록 or 취소 기능' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 404, description: '존재하지 않는 정보' })
  update(@Body() dto: LikeDto, @Req() req:any) {
    const user = req.user;
    return this.likesService.update({ ...dto, user: { id: user.userId }, post: { id: dto.postId } } as any);
  }
}
