/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { initCloudinary } from 'src/cloudinary/cloudinary';

type UploadImageType = {
  fileName: string;
  mimeType: string;
  base64: string;
};

@Injectable()
export class MediaService {
  private readonly cloudinary = initCloudinary();

  ping() {
    return {
      ok: true,
      service: 'media',
      now: new Date().toISOString(),
    };
  }

  async uploadImage(data: UploadImageType) {
    const { base64, mimeType } = data;

    if (!base64) {
      throw new BadRequestException('Image base64 is needed');
    }

    if (!mimeType?.startsWith('image/')) {
      throw new BadRequestException('Only images are allowed');
    }

    const buffer = Buffer.from(base64, 'base64');

    if (!buffer.length) {
      throw new BadRequestException('Invalid base64 image');
    }

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = this.cloudinary.uploader.upload_stream(
          {
            folder: 'corgi-media/images',
            resource_type: 'image',
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result as UploadApiResponse);
          },
        );

        stream.end(buffer);
      },
    );

    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  }
}
