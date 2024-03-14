export class DepartmentDto {
  readonly id: number;
  name: string;
  description: string;
  managing_department_id?: number;
}
