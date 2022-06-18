import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ImagesInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl({}, { each: true })
  @Expose()
  links: string[];
}
