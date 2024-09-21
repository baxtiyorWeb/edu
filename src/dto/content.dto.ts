import { CategoryDto } from './categories.dto';

export class ContentDto {
  id: number;
  title: string;
  description: string;
  img: string;
  video: string;
  category: CategoryDto;
  categoryId: number;
}
