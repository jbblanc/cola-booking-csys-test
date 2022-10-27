
import { AccountRole } from '../../account';
import { Permission } from './permission.enum';

export const PermissionsAccountScopes = {
  [AccountRole.GUEST]: [
    // No permission
  ],
  [AccountRole.EMPLOYEE]: [
    Permission.COMPANY_GET,
    Permission.ROOM_GET_ONE,
    Permission.ROOM_GET_MINE,
    Permission.RESERVATION_BOOK,
    Permission.RESERVATION_CANCEL,
    Permission.RESERVATION_GET,
    Permission.ACCOUNT_UPDATE_OWN,
    Permission.ACCOUNT_GET_OWN,
    Permission.ACCOUNT_DELETE_OWN,
  ],
  
  // AccountRole.ADMIN => no need to define permissions
  // since this role is granted ALL permissions by default
};
