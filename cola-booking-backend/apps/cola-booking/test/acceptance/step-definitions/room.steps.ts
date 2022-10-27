import { before, after, binding, given, then, when } from 'cucumber-tsflow';
import { expect, assert } from 'chai';

import { RoomScenarioContext } from '../../helpers/room/room-scenario-context';
import {
  rooms_create,
  rooms_update,
  rooms_getOne,
  rooms_trashOne,
  rooms_getMine,
} from '../../helpers/room/room';
import { Room } from '../../../src/room/model/room.entity';
import { StaticContext } from '../../helpers/static-context';
import { EntityStatus } from '../../../../../libs/commons/src/model/entity-status.enum';
import { companies_getOneFromName } from '../../helpers/company/company';
import { AccountPool } from '../../helpers/account-pool';

@binding([RoomScenarioContext, AccountPool])
export class RoomSteps {
  constructor(
    protected roomScenario: RoomScenarioContext,
    protected accountPool: AccountPool,
  ) {}

  @after('@room')
  public async runsAfterEachScenarioLastStep() {
    // purging all resources created during the test
    StaticContext.loggedAccount =
      await this.accountPool.accountFromRoleAndCompany('admin');
    for (let id of this.roomScenario.roomIdsToTrash) {
      await rooms_trashOne(id, StaticContext.loggedAccount.auth.access_token);
    }
  }

  @given(/I select Cola Day in calendar/, '@room')
  public async selectColaDayInCalendar() {
    this.roomScenario.selectedCalendarDay = new Date(process.env.COLA_DAY);
  }

  @when(/I reference a new room ([^"]*) for ([^"]*)/)
  public async createNewRoom(code: string, companyName: string) {
    const company = await companies_getOneFromName(
      companyName,
      StaticContext.loggedAccount.auth.access_token,
    );
    this.roomScenario.createRoomDto = {
      code,
      companyId: company.id,
    };
    const room: Room = await rooms_create(
      this.roomScenario.createRoomDto,
      StaticContext.loggedAccount.auth.access_token,
    );
    this.roomScenario.roomResource = room;
    this.roomScenario.roomIdsToTrash.push(room.id);
    expect(room).to.be.not.null;
    expect(room.id).to.be.not.null;
    expect(room.createdOn).to.be.not.null;
    expect(room.status).to.equal(EntityStatus.ACTIVE);
    expect(room.code).to.equal(this.roomScenario.createRoomDto.code);
    expect(room.companyId).to.equal(this.roomScenario.createRoomDto.companyId);
  }

  @when(/I update information about the room/)
  public async updateRoom() {
    let room: Room = await rooms_getOne(
      this.roomScenario.roomResource.id,
      StaticContext.loggedAccount.auth.access_token,
    );
    this.roomScenario.updateRoomDto = { code: 'NEW_CODE' };
    room = await rooms_update(
      room.id,
      this.roomScenario.updateRoomDto,
      StaticContext.loggedAccount.auth.access_token,
    );
    expect(room).to.be.not.null;
    this.roomScenario.roomResource = room;
    expect(room.code).to.equal(this.roomScenario.updateRoomDto.code);
  }

  @when(/I request my list of rooms/)
  public async listMyRooms() {
    const rooms: Room[] = await rooms_getMine(
      this.roomScenario.selectedCalendarDay,
      StaticContext.loggedAccount.auth.access_token,
    );
    this.roomScenario.roomsList = rooms;
  }

  @then(/I can consult details about the room/)
  public async consultOneRoom() {
    const room: Room = await rooms_getOne(
      this.roomScenario.roomResource.id,
      StaticContext.loggedAccount.auth.access_token,
    );
    expect(room).to.be.not.null;
    expect(room.id).to.equal(this.roomScenario.roomResource.id);
  }

  @then(/Changes are properly saved on room/)
  public async checkRoomUpdate() {
    expect(this.roomScenario.roomResource.code).to.equal(
      this.roomScenario.updateRoomDto.code,
    );
  }

  @then(/I have access to rooms from my company only/)
  public async checkMyRooms() {
    expect(this.roomScenario.roomsList).to.be.not.null;
    expect(this.roomScenario.roomsList.length).to.be.above(0);
    // contains only rooms for account company
    for (let room of this.roomScenario.roomsList) {
      if (room.companyId !== StaticContext.loggedAccount.account.companyId) {
        fail('My rooms list should contain only rooms from my company');
      }
    }
  }

  @then(/I have access to rooms from both Pepsi and Coke/)
  public async checkMyRoomsForColaDay() {
    expect(this.roomScenario.roomsList).to.be.not.null;
    expect(this.roomScenario.roomsList.length).to.be.above(0);
    // contains rooms for both companies
    const distinctCompanyIds = new Set(this.roomScenario.roomsList.map((r) => {
      return r.companyId;
    }));
    expect(distinctCompanyIds.size).to.equal(2);
  }
}
