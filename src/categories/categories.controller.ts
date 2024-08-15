import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from 'src/entities/categories.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/dto/categories.dto';
import { Content } from 'src/entities/content.entity';
import { ContentDto } from 'src/dto/content.dto';

@ApiTags('category-controller')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Get('category')
  async findCategories() {
    return this.categoryService.findAll();
  }
  @Get(':id/contents')
  async findContentByCategoryId(@Param('id') id: number) {
    return this.categoryService.getContentByCategory(id);
  }
  @Post('category')
  @ApiBody({ required: true, type: Content })
  async createCategories(@Body() category: Category) {
    return this.categoryService.createCategory(category);
  }
}
