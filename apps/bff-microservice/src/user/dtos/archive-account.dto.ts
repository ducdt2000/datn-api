import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ArchiveAccount {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
