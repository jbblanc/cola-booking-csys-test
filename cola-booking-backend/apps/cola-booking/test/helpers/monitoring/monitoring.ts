import 'dotenv/config';
import { apiRespToJson, apiGet } from '../api-fetch';

async function monitoring_getHealth(): Promise<any> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/monitoring/health`,
  });
  return await apiRespToJson(resp);
}

export { monitoring_getHealth };
