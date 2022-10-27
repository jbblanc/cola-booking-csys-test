import 'dotenv/config';
import { apiHandleResponse, apiPost } from '../api-fetch';
import { SignupDto } from '../../../src/auth/dto';
import { ValidAuthResponseDto } from '../../../src/auth/dto/valid-auth-response.dto';

async function signup_signup(dto: SignupDto): Promise<ValidAuthResponseDto> {
  const resp = await apiPost({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/auth/signup`,
    token: null,
    data: dto,
  });
  return await apiHandleResponse(resp, 201);
}

export { signup_signup };
