import { BrandOutput } from './brand-output.dto';
import { ProductVersionOutput } from './product-version-output.dto';
import { ProductTypeOutput } from './product-type-output.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ProductOutput {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  code: string;

  @ApiProperty()
  @Expose()
  productTypeId: string;

  @ApiProperty()
  @Expose()
  starPoint: number;

  @Expose()
  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  @Expose()
  slug: string;

  @ApiProperty()
  @Expose()
  defaultVersionId?: string;

  @ApiProperty()
  @Expose()
  brandId: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  @ApiPropertyOptional()
  @Expose()
  deletedAt?: Date;

  @ApiProperty()
  @Expose()
  @Type(() => ProductTypeOutput)
  productType: ProductTypeOutput;

  @ApiProperty()
  @Expose()
  @Type(() => ProductVersionOutput)
  productVersions: ProductVersionOutput[];

  @ApiPropertyOptional()
  @Expose()
  @Type(() => ProductVersionOutput)
  defaultProductVersion?: ProductVersionOutput;

  @ApiProperty()
  @Expose()
  @Type(() => BrandOutput)
  brand: BrandOutput;
}
