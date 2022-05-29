import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ImageInput {
  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  link: string;
}
