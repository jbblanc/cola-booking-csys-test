import { ScenarioBaseContext } from '../scenario-base-context';
import { Room } from '../../../src/room/model/room.entity';
import { CreateRoomDto } from '../../../src/room/dto/create-room.dto';
import { UpdateRoomDto } from '../../../src/room/dto/update-room.dto';

const dayDifferentFromColaDay: Date = new Date('2021-12-20'); // Date here should be any date but cola day
export class RoomScenarioContext extends ScenarioBaseContext {
  public roomResource: Room;
  public createRoomDto: CreateRoomDto;
  public updateRoomDto: UpdateRoomDto;
  public roomsList: Room[];
  public roomIdsToTrash: string[] = [];
  public selectedCalendarDay: Date = dayDifferentFromColaDay;

  constructor() {
    super();
  }

  public reset() {
    super.reset();
    this.roomResource = null;
    this.createRoomDto = null;
    this.updateRoomDto = null;
    this.roomsList = null;
    this.roomIdsToTrash = [];
    this.selectedCalendarDay = dayDifferentFromColaDay;
    // ...
  }
}
