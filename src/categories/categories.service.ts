import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/dto/categories.dto';
import { ContentDto } from 'src/dto/content.dto';
import { Category } from 'src/entities/categories.entity';
import { Content } from 'src/entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Category)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getContentByCategory(id: number): Promise<Content[]> {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
      relations: ['contents'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category.contents;
  }

  async createCategory(category: CategoryDto): Promise<Category> {
    const contents = await this.contentRepository.find({
      where: { categoryId: category.id },
    });

    const contentIds = contents.map((content) => content.id);

    const newContentCategory = {
      ...category,
      contentIds: contentIds,
    };

    const categories = this.categoryRepository.create(newContentCategory);
    return this.categoryRepository.save(categories);
  }
}
