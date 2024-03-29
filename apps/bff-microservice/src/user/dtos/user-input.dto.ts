import { ROLE, GENDER } from './../../../../../shared/constants/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class UserInput {
  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  address: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  city: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  district: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  @IsEnum(GENDER)
  gender: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  avatarLink?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  birthday: Date;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  inviteCode?: string;

  @ApiProperty()
  @Expose()
  @IsNotEmpty()
  @IsEnum(ROLE)
  role: string;
}
