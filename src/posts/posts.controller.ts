import {
  Controller,
  Get,
  Query,
  Param,
  Post as PostRoute,
  Body,
  UseGuards,
  Req,
  Patch,
  Delete,
  Post, ClassSerializerInterceptor, UseInterceptors
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import {ArrayMaxSize, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength} from "class-validator";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional, ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";

class ListQueryDto {
  @ApiPropertyOptional({ example: 1, description: '현재 페이지 번호' })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ example: 10, description: '페이지 당 요청 수' })
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ description: '카테고리 고유 ID' })
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional({ example: 'desc', description: '등록일 정렬 asc: 오래된순, desc: 최신순' })
  @IsOptional()
  sort?: 'asc' | 'desc';
}
class CreateDto {
  @ApiProperty({example: "게시물 내용 테스트", description: '게시물 내용(문자, 최대 280자)' })
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  @IsString({ message: '올바른 내용 형식이 아닙니다.(문자)' })
  @MaxLength(280, { message: '내용은 최대 280자까지 가능합니다.' })
  content: string;

  @ApiProperty({example: ["https://picsum.photos/500/300?random=1"
      , "https://picsum.photos/500/300?random=2"
      , "https://picsum.photos/500/300?random=3"], description: '이미지 URL(배열, 최대 4개, URL 형식)' })
  @IsArray({ message: '올바른 이미지 URL 형식이 아닙니다.(배열).' })
  @ArrayMaxSize(4, { message: '이미지는 최대 4개까지 가능합니다.' })
  @IsUrl({}, { each: true, message: '올바른 URL 형식이 아닙니다.(URL 형식)' })
  imageUrls: string[];

  @ApiProperty({example: 1, description: '카테고리 고유 ID(숫자)' })
  @IsNotEmpty({ message: '카테고리를 선택해주세요.' })
  @IsInt({ message: '올바른 카테고리 ID 형식이 아닙니다.(숫자)' })
  categoryId: number;
}

class UpdateDto {
  @ApiProperty({example: 1, description: '게시물 고유 ID(숫자)' })
  @IsNotEmpty({ message: '게시물을 선택해주세요.' })
  @IsInt({ message: '올바른 게시물 ID 형식이 아닙니다.(숫자)' })
  id: number;

  @ApiProperty({example: "게시물 내용 테스트", description: '게시물 내용(문자, 최대 280자)' })
  @IsNotEmpty({ message: '내용을 입력해주세요.' })
  @IsString({ message: '올바른 내용 형식이 아닙니다.(문자)' })
  @MaxLength(280, { message: '내용은 최대 280자까지 가능합니다.' })
  content: string;
}

class DeleteDto {
  @ApiProperty({example: 1, description: '게시물 고유 ID(숫자)' })
  @IsNotEmpty({ message: '게시물을 선택해주세요.' })
  @IsInt({ message: '올바른 게시물 ID 형식이 아닙니다.(숫자)' })
  id: number;
}

@UseInterceptors(ClassSerializerInterceptor)
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // 게시글 목록
  @Get()
  @ApiOperation({ summary: '게시물 목록' })
  @ApiResponse({ status: 200, description: '성공' })
  list(@Query() query: ListQueryDto)  {
    return this.postsService.findAll(query);
  }

  // 게시물 상세 조회
  @Get(':id')
  @ApiOperation({ summary: '게시물 상세 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  @ApiResponse({ status: 404, description: '존재하지 않는 정보' })
  detail(@Param('id') id: number) {
    return this.postsService.findOne(Number(id));
  }

  // 게시물 등록
  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({ description: '인증 실패(Unauthorized)' })
  @ApiOperation({ summary: '게시물 등록' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 404, description: '존재하지 않는 정보' })
  create(@Body() dto: CreateDto, @Req() req:any) {
    const user = req.user;
    return this.postsService.create({ ...dto, user: { id: user.userId }, category: { id: dto.categoryId } } as any);
  }

  // 게시물 수정
  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({ description: '인증 실패(Unauthorized)' })
  @ApiOperation({ summary: '게시물 수정' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  update(@Body() dto: UpdateDto, @Req() req:any) {
    const user = req.user;
    return this.postsService.update({ ...dto, user: { id: user.userId } } as any);
  }

  // 게시물 삭제
  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse({ description: '인증 실패(Unauthorized)' })
  @ApiOperation({ summary: '게시물 삭제' })
  @ApiResponse({ status: 201, description: '성공' })
  @ApiResponse({ status: 403, description: '권한 없음' })
  delete(@Body() dto: DeleteDto, @Req() req:any) {
    const user = req.user;
    return this.postsService.delete({ ...dto, user: { id: user.userId } } as any);
  }
}
