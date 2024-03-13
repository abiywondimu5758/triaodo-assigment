export class DepartmentDto {
  readonly id: number;
  name: string;
  description: string;
  managingDepartmentId?: number;
}
