import { RequestContext } from './../../../../../shared/request-context/request-context.dto';
import { CustomProductTemplateRepository } from './../repositories/custom-product-template.repository';
import { Injectable } from '@nestjs/common';
import { CustomProductValueRepository } from '../repositories/custom-product-value.repository';
import { CustomProductRepository } from '../repositories/custom-product.repository';
import { CustomPropertyRepository } from '../repositories/custom-property.repository';
import { CustomProductInput } from '../dtos/custom-product-input.dto';

@Injectable()
export class CustomProductService {
  constructor(
    private readonly customProductTemplateRepository: CustomProductTemplateRepository,
    private readonly customProductValueRepository: CustomProductValueRepository,
    private readonly customProductRepository: CustomProductRepository,
    private readonly customPropertyRepository: CustomPropertyRepository,
  ) {}

  async getCustomTemplates(ctx: RequestContext) {
    const [templates, count] =
      await this.customProductTemplateRepository.findAndCount({
        join: {
          alias: 'template',
          leftJoinAndSelect: {
            properties: 'template.properties',
            values: 'properties.values',
          },
        },
      });

    return templates;
  }

  async getCustomTemplate(ctx: RequestContext, id: number) {
    return this.customProductTemplateRepository.findOne(id, {
      join: {
        alias: 'template',
        leftJoinAndSelect: {
          properties: 'template.properties',
          values: 'properties.values',
        },
      },
    });
  }

  async createCustomProduct(ctx: RequestContext, input: CustomProductInput) {
    const newInput = this.customProductRepository.create(input);

    return this.customProductRepository.save(newInput);
  }
}
