import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/dto/categories.dto';
import { ContentDto } from 'src/dto/content.dto';
import { Category } from 'src/entities/categories.entity';
import { Content } from 'src/entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    @InjectRepository(Content)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  // create content video

  async createContent(content: ContentDto): Promise<Content> {
    const category = await this.categoriesRepository.findOne({
      where: { id: 2 },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const newContent = {
      ...content,
      categoryId: category.id, // Kategoriyani id bo'yicha o'zlashtirish
      category: category, // To'liq kategoriya obyektini ham bog'lash
    };

    const createdContent = this.contentRepository.create(newContent);
    return this.contentRepository.save(createdContent);
  }
}
