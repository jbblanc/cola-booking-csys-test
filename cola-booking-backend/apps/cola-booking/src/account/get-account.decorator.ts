import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Account } from './model/account.entity';
/*
Permet d'extraire le compte utilisateur depuis la requête entrante
Ce compte aura été ajouté à la requête lors de la validation du token
*/
export const GetAccount = createParamDecorator(
  (data: unknown, ctx: ExecutionContext):  Account => {
    const request = ctx.switchToHttp().getRequest();
    return request.account;
  },
);
