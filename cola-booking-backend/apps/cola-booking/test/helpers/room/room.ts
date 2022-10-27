import { Room } from '../../../src/room/model/room.entity';
import 'dotenv/config';
import {
  apiHandleResponse,
  apiGet,
  apiPost,
  apiPatch,
  apiDelete,
} from '../api-fetch';
import { CreateRoomDto } from '../../../src/room/dto/create-room.dto';
import { UpdateRoomDto } from '../../../src/room/dto/update-room.dto';

async function rooms_create(dto: CreateRoomDto, token: string): Promise<Room> {
  const resp = await apiPost({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/rooms/`,
    token,
    data: dto,
  });
  return await apiHandleResponse(resp, 201);
}

async function rooms_update(
  id: string,
  dto: UpdateRoomDto,
  token: string,
): Promise<Room> {
  const resp = await apiPatch({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/rooms/${id}`,
    token,
    data: dto,
  });
  return await apiHandleResponse(resp, 200);
}

async function rooms_getOne(id: string, token: string): Promise<Room> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/rooms/${id}`,
    token,
  });
  return await apiHandleResponse(resp, 200);
}

async function rooms_getOneFromCode(code: string, token: string): Promise<Room> {
  const allRooms = await rooms_getAll(token);
  const room = allRooms.filter(r => r.code === code);
  return room.length > 0 ? room[0] : null;
}

async function rooms_getMine(day: Date, token: string): Promise<Room[]> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/rooms/mine?day=${day.toUTCString()}`,
    token,
  });
  return await apiHandleResponse(resp, 200);
}

async function rooms_getAll(token: string): Promise<Room[]> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/rooms`,
    token,
  });
  return await apiHandleResponse(resp, 200);
}

async function rooms_getAllForCompany(companyId: string, token: string): Promise<Room[]> {
  const resp = await apiGet({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/rooms/search?companyId=${companyId}`,
    token,
  });
  return await apiHandleResponse(resp, 200);
}

async function rooms_trashOne(id: string, token: string): Promise<void> {
  await apiDelete({
    route: `${process.env.COLA_BOOKING_API_BASE_URL}/api/v1/rooms/${id}/trash`,
    token,
  });
}

export {
  rooms_create,
  rooms_update,
  rooms_getOne,
  rooms_getMine,
  rooms_getOneFromCode,
  rooms_getAll,
  rooms_getAllForCompany,
  rooms_trashOne,
};
