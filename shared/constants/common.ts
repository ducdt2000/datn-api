export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';
export const FORWARDED_FOR_TOKEN_HEADER = 'x-forwarded-for';

//enum
export enum COMMENT_TYPE {
  FEEDBACK = 'feedback',
  REPLY = 'reply',
}

export enum BRAND_TYPE {
  LOCAL = 'local',
  FOREIGN = 'foreign',
}

export enum ORDER_TYPE {
  ASCENDING = 'ASC',
  DESCENDING = 'DESC',
}

export enum BRAND_ORDER_BY {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TYPE = 'type',
}

export enum GENDER {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

export const MINUTES_IN_ONE_HOUR = 60;
export const ONE_HOUR = 1;
export const TWO_DIGITS = 10;
export const DEFAULT_DOUBLE_ZERO = '00';
