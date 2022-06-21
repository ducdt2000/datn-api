export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';
export const FORWARDED_FOR_TOKEN_HEADER = 'x-forwarded-for';
export const CONTENT_TYPE = 'Content-Type';

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

export enum PRODUCT_ORDER_BY {
  NAME = 'name',
  PRICE = 'price',
  CREATED_AT = 'createdAt',
  STAR = 'starPoint',
}

export enum BRAND_ORDER_BY {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TYPE = 'type',
}

export enum USER_ORDER_BY {
  FULLNAME = 'fullname',
  USERNAME = 'username',
  EMAIL = 'email',
  PHONE = 'phone',
  AGE = 'age',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  DELETED_AT = 'deletedAt',
}

export enum WAREHOUSE_ORDER_BY {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export enum WAREHOUSE_LOG_ORDER_BY {
  CREATED_AT = 'createdAt',
}

export enum GENDER {
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

export enum ROLE {
  ADMIN = 'admin',
  STAFF = 'staff',
  USER = 'user',
  GUEST = 'guest',
}

export enum USER_ACTIVE {
  ACTIVE = 1,
  INACTIVE = 2,
}

export enum REQUEST_CONTENT_TYPE {
  FORM_DATA = 'multipart/form-data',
}

export enum WAREHOUSE_STATUS {
  ACTIVE = 1,
  INACTIVE = 2,
}

export enum WAREHOUSE_LOG_TYPE {
  IMPORT = 1,
  EXPORT = 2,
}

export const MIN_DATE = new Date(-8640000000000000);
export const MAX_DATE = new Date(8640000000000000);
export const MAX_FILE_UPLOAD = 20;
export const MINUTES_IN_ONE_HOUR = 60;
export const ONE_HOUR = 1;
export const TWO_DIGITS = 10;
export const DEFAULT_DOUBLE_ZERO = '00';

export const PHONE_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
