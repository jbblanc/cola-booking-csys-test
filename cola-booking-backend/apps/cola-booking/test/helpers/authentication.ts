import { Account } from '../../src/account/model/account.entity';
import 'dotenv/config';
import fetch from 'node-fetch';
import { apiPost } from './api-fetch';

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthenticatedAccount {
  account?: Account; // optional
  auth: {
    access_token: string;
    expires_on: number; // timestamp
  };
}

export const authenticateAccount = async (
  credentials: Credentials,
): Promise<AuthenticatedAccount> => {
  const resp = await apiPost({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/auth/login`,
    data: credentials,
  });

  if (resp && resp.status === 200) {
    const data = await resp.json();
    return {
      // not setting account here, only auth details
      auth: {
        access_token: data.token,
        expires_on: Date.now() + 30 * 60 * 1000, // adding arbitrary + 30 minutes until we explicitly invalidate token in this pool
      },
      account: data.account,
    };
  } else {
    return null; // not skipping other tests by throwing exception here
  }
};
