import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { Content } from 'src/entities/content.entity';

@Controller('content')
@ApiTags('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}
  @Get('/content')
  async findAll() {
    return this.contentService.findAll();
  }
  @Post('/content')
  @ApiBody({ required: true })
  async createContent(@Body() content: Content) {
    return this.contentService.createContent(content);
  }
}
