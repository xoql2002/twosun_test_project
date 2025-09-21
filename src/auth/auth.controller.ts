import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import {IsAlphanumeric, IsNotEmpty, IsOptional, IsUrl, Matches, MinLength} from 'class-validator';
import {ApiOperation, ApiProperty, ApiResponse} from "@nestjs/swagger";

class RegisterDto {
  @ApiProperty({example: 'test', description: '아이디(영문소문자, 숫자)' })
  @IsNotEmpty({ message: '아이디를 입력해주세요.' })
  @Matches(/^[a-z0-9]+$/, { message: '올바른 아이디 형식이 아닙니다.(영문소문자, 숫자)' })
  username: string;

  @ApiProperty({example: '홍길동', description: '이름(한글, 영문대소문자)' })
  @IsNotEmpty({ message: '이름을 입력해주세요.' })
  @Matches(/^[가-힣a-zA-Z]+$/, { message: '올바른 이름 형식이 아닙니다.(한글, 영문대소문자)' })
  name: string;

  @ApiProperty({example: 'test', description: '닉네임(영문소문자)' })
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @Matches(/^[a-z]+$/, { message: '올바른 닉네임 형식이 아닙니다.(영문소문자)' })
  nickname: string;

  @ApiProperty({example: 'test123!', description: '비밀번호(영문소문자, 숫자, 특수문자 1개 이상 포함)' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).+$/, { message: '올바른 비밀번호 형식이 아닙니다.' +
        '(영문소문자, 숫자, 특수문자 1개 이상 포함)' })
  password: string;

  @ApiProperty({example: 'https://picsum.photos/40/40?random=1', description: '프로필 이미지 URL(URL 형식)' })
  @IsUrl({}, { message: '올바른 URL 형식이 아닙니다.(URL 형식)' })
  profileImageUrl: string;
}

class LoginDto {
  @ApiProperty({example: 'test', description: '아이디' })
  @IsNotEmpty({ message: '아이디를 입력해주세요.' })
  username: string;

  @ApiProperty({example: 'test123!', description: '비밀번호' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  password: string;
}

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  // 회원가입
  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '잘못된 요청 또는 존재하는 정보' })
  async register(@Body() dto: RegisterDto) {
    const exists = await this.usersService.findByUsername(dto.username);
    if (exists) throw new HttpException('존재하는 아이디입니다.', HttpStatus.BAD_REQUEST);
    const nick = await this.usersService.findByNickname(dto.nickname);
    if (nick) throw new HttpException('존재하는 닉네임입니다.', HttpStatus.BAD_REQUEST);
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.authService.register({...dto, password: hashed});
  }

  // 로그인
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 201, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '잘못된 로그인 정보' })
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.username, dto.password);
    if (!user) throw new HttpException('아이디 또는 비밀번호를 확인해주세요.', 401);
    return this.authService.login(user);
  }
}
