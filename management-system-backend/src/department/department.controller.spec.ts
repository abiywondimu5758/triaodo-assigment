/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmentDto } from './department.dto';

describe('DepartmentController', () => {
  let controller: DepartmentController;
  let departmentService: DepartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentController],
      providers: [
        {
          provide: DepartmentService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test Department', description: 'Test Description' }]),
            findOne: jest.fn().mockImplementation((id: number) => {
              if (id === 1) {
                return { id: 1, name: 'Test Department', description: 'Test Description' };
              } else {
                return null;
              }
            }),
            create: jest.fn().mockImplementation((departmentDto: DepartmentDto) => departmentDto),
            update: jest.fn().mockImplementation((id: number, departmentDto: DepartmentDto) => {
              if (id === 1) {
                return departmentDto;
              } else {
                return null;
              }
            }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<DepartmentController>(DepartmentController);
    departmentService = module.get<DepartmentService>(DepartmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of departments', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{ id: 1, name: 'Test Department', description: 'Test Description' }]);
    });
  });

  describe('findOne', () => {
    it('should return a department with the specified id', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual({ id: 1, name: 'Test Department', description: 'Test Description' });
    });

    it('should return null if department with the specified id does not exist', async () => {
      const result = await controller.findOne('2');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new department', async () => {
      const departmentDto: DepartmentDto = {
        name: 'New Department', description: 'New Description',
        id: 0
      };
      const result = await controller.create(departmentDto);
      expect(result).toEqual(departmentDto);
    });
  });

  describe('update', () => {
    it('should update the department with the specified id', async () => {
      const departmentDto: DepartmentDto = {
        name: 'Updated Department', description: 'Updated Description',
        id: 0
      };
      const result = await controller.update('1', departmentDto);
      expect(result).toEqual(departmentDto);
    });

    it('should return null if department with the specified id does not exist', async () => {
      const departmentDto: DepartmentDto = {
        name: 'Updated Department', description: 'Updated Description',
        id: 0
      };
      const result = await controller.update('2', departmentDto);
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove the department with the specified id', async () => {
      await controller.remove('1');
      expect(departmentService.remove).toHaveBeenCalledWith(1);
    });
  });
});
