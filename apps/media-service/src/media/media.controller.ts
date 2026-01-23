import { Controller } from '@nestjs/common';
import { MediaService } from './media.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

type UploadImageType = {
  fileName: string;
  mimeType: string;
  base64: string;
};

@Controller('media')
@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @MessagePattern('media.uploadImage')
  async uploadImage(@Payload() data: UploadImageType) {
    return this.mediaService.uploadImage(data);
  }

  @MessagePattern('service.ping')
  ping() {
    return this.mediaService.ping();
  }
}
