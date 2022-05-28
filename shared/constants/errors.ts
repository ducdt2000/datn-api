export enum ErrCategoryCode {
  // No required parameter
  REQUIRED_PARAM = '01',
  // Invalid parameter value The type, definition range, character type, string pattern, or number of characters does not conform to the WebAPI specification.
  INVALID_PARAM = '02',
  // The specified ID is not registered
  ID_NOT_REGISTER = '04',
  // Unauthorized
  UNAUTHORIZED = '05',
  // Duplicate value to be registered Violation of DB unique constraint.
  DUPLICATE_VALUE = '06',
  // Data update conflict Update failed because another transaction updated the target data first.
  DATA_UPDATE_CONFLICT = '07',
  FORBIDDEN = '08',
  // Unexpected Error Unexpected error such as programming error or DB operation. The cause is investigated in the log (Amazon Cloud Watch).
  UNEXPECTED = '99',
}

export enum ErrMicroserviceCode {
  PRODUCT = '01',
  UNEXPECTED = '99',
}

export enum ErrDetailCode {
  UNEXPECTED = '99',
  FORBIDDEN = '98',
  NAME = '01',
  TYPE = '02',
  SLUG = '03',
  ID = '04',
  CODE = '05',
  VALUES = '06',
  PRICE = '07',
  DESCRIPTION = '08',
  LINK = '09',
  COUNT = '10',
  STAR_POINT = '11',
  PRODUCT_VERSION = '12',
  PRODUCT = '13',
  OFFSET = '24',
  LIMIT = '25',
  ORDER_BY = '26',
  ORDER_TYPE = '27',
  FROM = '90',
  TO = '91',
}
