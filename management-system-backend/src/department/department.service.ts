import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient, Department } from '@prisma/client';
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
    if (departmentDto.managing_department_id) {
      const managingDepartmentExists = await this.prisma.department.findUnique({
        where: { id: departmentDto.managing_department_id },
      });
      if (!managingDepartmentExists) {
        throw new NotFoundException(
          `Managing department with ID ${departmentDto.managing_department_id} not found.`,
        );
      }
    }

    return this.prisma.department.create({
      data: departmentDto,
    });
  }

  async update(
    id: number,
    departmentDto: DepartmentDto,
  ): Promise<DepartmentDto | null> {
    if (departmentDto.managing_department_id) {
      const managingDepartmentExists = await this.prisma.department.findUnique({
        where: { id: departmentDto.managing_department_id },
      });
      if (!managingDepartmentExists) {
        throw new NotFoundException(
          `Managing department with ID ${departmentDto.managing_department_id} not found.`,
        );
      }
    }

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

  async findManagingDepartment(id: number): Promise<DepartmentDto | null> {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });
    if (!department) return null;

    const managingDepartmentId = department.managing_department_id;
    if (!managingDepartmentId) return null;

    const managingDepartment = await this.prisma.department.findUnique({
      where: { id: managingDepartmentId },
    });

    return managingDepartment ? this.mapToDto(managingDepartment) : null;
  }

  async findDepartmentsUnderManagement(id: number): Promise<DepartmentDto[]> {
    const departments = await this.prisma.department.findMany({
      where: { managing_department_id: id },
    });
    return departments.map((department) => this.mapToDto(department));
  }

  private mapToDto(department: Department): DepartmentDto {
    return {
      id: department.id,
      name: department.name,
      description: department.description,
      managing_department_id: department.managing_department_id,
    };
  }
}
