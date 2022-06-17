import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ImagesInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl({}, { each: true })
  links: string[];
}
