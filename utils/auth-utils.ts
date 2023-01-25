// import { CREATE_PRIVILEGE, READ_PRIVILEGE, UPDATE_PRIVILEGE, DELETE_PRIVILEGE, SUPER_ADMIN_PRIVILEGE } from './constants';

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string[] | undefined | null
) {
  if (_userPermissions) {
    return Boolean(
      _allowedRoles?.find((role) => _userPermissions.includes(role))
    );
  }
  return false;
}
