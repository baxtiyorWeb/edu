import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Content } from './content.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img_name: string;

  @OneToMany(() => Content, (content) => content.category)
  contents: Content[];
}
