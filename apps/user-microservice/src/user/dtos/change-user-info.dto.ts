import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
export class ChangeUserInfo {
  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  fullname?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  district?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  gender?: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  avatarLink?: string;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  birthday?: Date;
}
