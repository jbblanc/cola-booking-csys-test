import { AccountService } from '../account';
import { PermissionsGuard } from '../commons/permissions';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';




@Injectable()
export class ReservationPermissionsGuard extends PermissionsGuard {
  constructor(private readonly accountService: AccountService) {
    super(new Reflector());
  }

  
}
