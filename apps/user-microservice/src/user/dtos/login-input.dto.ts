import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LoginInput {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  account: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
