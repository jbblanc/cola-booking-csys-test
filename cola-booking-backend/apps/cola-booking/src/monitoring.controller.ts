import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Monitoring')
@Controller('api/v1/monitoring')
export class MonitoringController {
  constructor() {}

  @Get('health')
  async health(): Promise<any> {
    // very poor implementation at the moment
    return {
      status: 'OK',
    };
  }
}
