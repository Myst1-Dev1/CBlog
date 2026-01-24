/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller } from '@nestjs/common';
import { MediaService } from './media.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';

type UploadImageType = {
  fileName: string;
  mimeType: string;
  base64: string;
};

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern('media.uploadImage')
  async uploadImage(@Payload() data: UploadImageType) {
    try {
      return this.mediaService.uploadImage(data);
    } catch (error) {
      console.log('Erro ao fazer upload da imagem', error);
      throw new RpcException(
        error.response || error.message || 'Internal Error',
      );
    }
  }

  @MessagePattern('service.ping')
  ping() {
    return this.mediaService.ping();
  }
}
