import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from 'src/entities/files.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Files) private readonly fileServices: Repository<Files>,
  ) {}

  async uploadFile(
    filename: string,
    path: string,
    fileUrl: string,
  ): Promise<void> {
    const files = this.fileServices.create({
      filename,
      path,
      fileUrl,
    });
    await this.fileServices.save(files);
  }

  async getVideo(filename: string) {
    return this.fileServices.findOne({ where: { filename } });
  }

  async deleteVideo(id: number) {
    const file = await this.fileServices.findOne({ where: { id } });

    if (!file) {
      throw new NotFoundException('error');
    } else {
      return this.fileServices.delete(id);
    }
  }
}
