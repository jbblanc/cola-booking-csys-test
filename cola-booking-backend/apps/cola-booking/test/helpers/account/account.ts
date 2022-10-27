import 'dotenv/config';
import { apiHandleResponse, apiGet, apiDelete } from '../api-fetch';
import { Account } from '../../../src/account/model/account.entity';

async function accounts_getMine(token: string): Promise<Account> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/accounts/mine`,
    token,
  });
  return await apiHandleResponse(resp, 200);
}

async function accounts_getAll(token: string): Promise<Account[]> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/accounts`,
    token,
  });
  return await apiHandleResponse(resp, 200);
}

async function accounts_trashOne(id: string, token: string): Promise<void> {
  await apiDelete({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/accounts/${id}/trash`,
    token,
  });
}

export { accounts_getMine, accounts_getAll, accounts_trashOne };
