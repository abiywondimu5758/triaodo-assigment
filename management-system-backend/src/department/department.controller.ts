import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DepartmentDto } from './department.dto';
import { DepartmentService } from './department.service';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  @Get()
  async findAll(): Promise<DepartmentDto[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DepartmentDto | null> {
    return this.departmentService.findOne(parseInt(id, 10));
  }

  @Post()
  async create(@Body() departmentDto: DepartmentDto): Promise<DepartmentDto> {
    return this.departmentService.create(departmentDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() departmentDto: DepartmentDto,
  ): Promise<DepartmentDto | null> {
    return this.departmentService.update(parseInt(id, 10), departmentDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.departmentService.remove(parseInt(id, 10));
  }
}
