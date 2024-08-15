import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Files } from 'src/entities/files.entity';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadVideo(@UploadedFile() file: Files) {
    const serverUrl = `http://localhost:3000`;
    const fileUrl = `${serverUrl}/files/${file.filename}`;
    const savedVideo = await this.filesService.uploadFile(
      file.filename,
      file.path,
      fileUrl,
    );

    return {
      file: savedVideo,
    };
  }

  @Get(':filename')
  async findFile(@Param('filename') filename: string, @Res() res: Response) {
    const file = await this.filesService.getVideo(filename);

    if (file) {
      res.sendFile(file.path, { root: '.' });
    } else {
      res.status(404).send('File not Found');
    }
  }
  @Delete(':id')
  async deleteFile(@Param('id') id: number) {
    return this.filesService.deleteVideo(id);
  }
}
