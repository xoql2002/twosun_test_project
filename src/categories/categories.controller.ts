import { Controller, Get, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // 게시물 카테고리 목록 조회
  @Get()
  @ApiOperation({ summary: '게시물 카테고리 목록 조회' })
  @ApiResponse({ status: 200, description: '성공' })
  list() {
    return this.categoriesService.findAll();
  }
}
