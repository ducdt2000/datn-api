import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ProductUpdateInput {
  @ApiPropertyOptional()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  productTypeId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  defaultVersionId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  brandId?: string;
}
