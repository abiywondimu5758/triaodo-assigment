import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DepartmentDto } from './department.dto';

@Injectable()
export class DepartmentService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<DepartmentDto[]> {
    return this.prisma.department.findMany();
  }

  async findOne(id: number): Promise<DepartmentDto | null> {
    return this.prisma.department.findUnique({
      where: { id },
    });
  }

  async create(departmentDto: DepartmentDto): Promise<DepartmentDto> {
    return this.prisma.department.create({
      data: departmentDto,
    });
  }

  async update(
    id: number,
    departmentDto: DepartmentDto,
  ): Promise<DepartmentDto | null> {
    await this.prisma.department.update({
      where: { id },
      data: departmentDto,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.department.delete({
      where: { id },
    });
  }
}
