import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

import { Company } from './model/company.entity';
import { AuthGuard } from '../auth';
import { CompanyPermissionsGuard } from './company-permissions.guard';
import { Permission, Permissions } from '../commons/permissions';

@ApiTags('Companies')
@Controller('api/v1/companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, CompanyPermissionsGuard)
  @Permissions(Permission.COMPANY_CREATE)
  @Post()
  async create(@Body() dto: CreateCompanyDto): Promise<Company> {
    return await this.companyService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, CompanyPermissionsGuard)
  @Permissions(Permission.COMPANY_UPDATE)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
  ): Promise<Company> {
    return await this.companyService.update(id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, CompanyPermissionsGuard)
  @Permissions(Permission.COMPANY_GET)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Company> {
    return await this.companyService.findOne(id);
  }

  //This route is PUBLIC (used by Register/Signup while no account exists yet)
  @Get()
  async listAllActive(): Promise<Company[]> {
    return await this.companyService.listAllActive();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, CompanyPermissionsGuard)
  @Permissions(Permission.COMPANY_TRASH)
  @Delete(':id/trash')
  async trash(@Param('id') id: string): Promise<void> {
    return this.companyService.trash(id);
  }
}
