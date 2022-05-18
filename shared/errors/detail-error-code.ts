import {
  ErrCategoryCode,
  ErrDetailCode,
  ErrMicroserviceCode,
} from '../../shared/constants/errors';

export class DetailErrorCode {
  message?: string;
  categoryCode: ErrCategoryCode;
  microserviceCode: ErrMicroserviceCode;
  detailCode: ErrDetailCode;

  constructor(
    categoryCode: ErrCategoryCode,
    subCategoryCode: ErrMicroserviceCode,
    detailCode: ErrDetailCode,
    message?: string,
  ) {
    this.categoryCode = categoryCode;
    this.microserviceCode = subCategoryCode;
    this.detailCode = detailCode;
    this.message = message;
  }
}
