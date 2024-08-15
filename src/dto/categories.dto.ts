import { Content } from 'src/entities/content.entity';
import { ContentDto } from './content.dto';

export class CategoryDto {
  id?: number;
  name: string;
  img_name: string;
  contents: Content[];
}
