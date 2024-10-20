import { Student } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class StudentEntity implements Partial<Student> {
  @Exclude()
  id?: number;
  constructor(partical: Partial<StudentEntity>) {
    Object.assign(this, partical);
  }
}
