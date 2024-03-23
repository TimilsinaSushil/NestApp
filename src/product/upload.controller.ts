import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';
@Controller()
export class UploadController {
    @Post('upload')
    @UseInterceptors(FileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: './uploads',
                filename(req, file, callback) {
                    const fileNameSplit = file.originalname.split(".")
                    const fileExt = fileNameSplit[fileNameSplit.length - 1]
                    callback(null, `${Date.now()}.${fileExt}`)
                },
            })
        }
    ))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            url: `http://localhost:3000/api/${file.path}`
        }
    }


    @Get('uploads/:path')
    async getImage(
        @Param('path') path,
        @Res() res: Response
    ) {
        res.sendFile(path, {root:'uploads'})
    }
}
