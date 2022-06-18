import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ImageInput {
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  @Expose()
  link: string;
}
