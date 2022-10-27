import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './model/company.entity';
import { Repository } from 'typeorm';
import { EntityStatus } from '@colabooking/commons';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(dto: CreateCompanyDto): Promise<Company> {
    const shop = await this.companyRepository.create(dto);
    await shop.save();
    return shop;
  }

  async update(id: string, dto: UpdateCompanyDto): Promise<Company> {
    await this.companyRepository.update(id, dto);
    return await this.findOne(id);
  }

  async findOne(id: string): Promise<Company> {
    return await this.companyRepository.findOne(id);
  }

  async listAllActive(): Promise<Company[]> {
    return await this.companyRepository.find({
      where: {
        status: EntityStatus.ACTIVE,
      },
    });
  }

  async trash(id: string): Promise<void> {
    await this.companyRepository.delete(id);
  }
}
