import { $Enums, Student } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpsertStudentDto implements Partial<Student> {
  @IsOptional()
  uuid: string;
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsInt()
  @Min(9999)
  @Type(() => Number)
  studentId: number;

  @IsNotEmpty({ message: 'gender is required' })
  gender: $Enums.Gender;

  @IsNotEmpty({ message: 'address is required' })
  address: string;
}
