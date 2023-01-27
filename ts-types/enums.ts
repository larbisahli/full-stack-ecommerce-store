/* eslint-disable no-unused-vars */

// CUSTOMER PRIVILEGES
export enum INTERNAL_PRIVILEGES {
  READ = 'read_privilege',
  CREATE = 'create_privilege',
  UPDATE = 'update_privilege',
  DELETE = 'delete_privilege'
}

// STAFF PRIVILEGES
export enum STAFF_PRIVILEGES {
  READ = 'staff_read_privilege',
  CREATE = 'staff_create_privilege',
  UPDATE = 'staff_update_privilege',
  DELETE = 'staff_delete_privilege'
}

// ADMIN PRIVILEGES
export enum ADMIN_PRIVILEGES {
  READ = 'admin_read_privilege',
  CREATE = 'admin_create_privilege',
  UPDATE = 'admin_update_privilege',
  DELETE = 'admin_delete_privilege',
  SUPER = 'super_admin_privilege'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum OrderBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at'
}

export enum ErrorNames {
  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  EMAIL_ALREADY_EXIST = 'EMAIL_ALREADY_EXIST',
  SERVER_ERROR = 'SERVER_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SOMETHING_HAPPENED = 'SOMETHING_HAPPENED',
  TRANSACTION_ERROR = 'TRANSACTION_ERROR',
  STAFF_DOES_NOT_EXIST = 'STAFF_DOES_NOT_EXIST',
  BAD_REQUEST = 'BAD_REQUEST',
  FORBIDDEN = 'FORBIDDEN',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_NOT_ACTIVE = 'USER_NOT_ACTIVE'
}

export enum CookieNames {
  STAFF_TOKEN_NAME = 'STAFF_TOKEN',
  CUSTOMER_SESSION_NAME = 'SESSION',
  XSRF_TOKEN = 'XSRF_TOKEN'
}
