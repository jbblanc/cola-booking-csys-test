import { Company } from '../../../src/company/model/company.entity';
import 'dotenv/config';
import {
  apiHandleResponse,
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
} from '../api-fetch';
import { CreateCompanyDto } from '../../../src/company/dto/create-company.dto';
import { UpdateCompanyDto } from '../../../src/company/dto/update-company.dto';

async function companies_create(dto: CreateCompanyDto, token: string): Promise<Company> {
  const resp = await apiPost({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/companies/`,
    token,
    data: dto,
  });
  return await apiHandleResponse(resp, 201);
}

async function companies_update(
  id: string,
  dto: UpdateCompanyDto,
  token: string,
): Promise<Company> {
  const resp = await apiPatch({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/companies/${id}`,
    token,
    data: dto,
  });
  return await apiHandleResponse(resp, 200);
}

async function companies_getOne(id: string, token: string): Promise<Company> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/companies/${id}`,
    token,
  });
  return await apiHandleResponse(resp, 200);
}

async function companies_getOneFromName(name: string, token: string): Promise<Company> {
  const allCompanies = await companies_getAll(token);
  const company = allCompanies.filter(c => c.name === name);
  return company.length > 0 ? company[0] : null;
}


async function companies_getAll(token: string): Promise<Company[]> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/companies`,
    token,
  });
  return await apiHandleResponse(resp, 200);
}

async function companies_trashOne(id: string, token: string): Promise<void> {
  await apiDelete({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/companies/${id}/trash`,
    token,
  });
}

export {
  companies_create,
  companies_update,
  companies_getOne,
  companies_getOneFromName,
  companies_getAll,
  companies_trashOne,
};
