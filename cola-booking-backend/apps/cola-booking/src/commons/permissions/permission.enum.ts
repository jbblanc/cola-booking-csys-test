export enum Permission {
  // ACCOUNT
  ACCOUNT_GET = 'account:get',
  ACCOUNT_GET_OWN = 'account:get:own',
  ACCOUNT_UPDATE_OWN = 'account:update:own',
  ACCOUNT_DELETE_OWN = 'account:delete:own',
  ACCOUNT_SUSPEND_OWN = 'account:suspend:own',
  ACCOUNT_RESTORE_OWN = 'account:restore:own',
  ACCOUNT_TRASH = 'account:trash',

  // COMPANY
  COMPANY_GET = 'company:get',
  COMPANY_CREATE = 'company:create',
  COMPANY_UPDATE = 'company:update',
  COMPANY_DELETE = 'company:delete',
  COMPANY_TRASH = 'company:trash',

  // ROOM
  ROOM_GET_ONE = 'room:get',
  ROOM_GET_MINE = 'room:get:own',
  ROOM_GET_ALL = 'room:get:all',
  ROOM_CREATE = 'room:create',
  ROOM_UPDATE = 'room:update',
  ROOM_DELETE = 'room:delete',
  ROOM_TRASH = 'room:trash',

  // RESERVATION
  RESERVATION_GET = 'reservation:get',
  RESERVATION_BOOK = 'reservation:book',
  RESERVATION_CANCEL = 'reservation:cancel',
  RESERVATION_TRASH = 'reservation:trash',
}
