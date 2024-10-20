import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { StudentEntity } from './entities/student.entity';
import { UpsertStudentDto } from './dto/upsert-student.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(dto: UpsertStudentDto) {
    if (!dto.uuid) Object.assign(dto, { uuid: nanoid() });
    return new StudentEntity(
      await this.prisma.student.upsert({
        where: { uuid: dto.uuid },
        create: { ...dto },
        update: { ...dto },
      }),
    );
  }

  async findAll() {
    return await this.prisma.student
      .findMany()
      .then((data) => data.map((i) => new StudentEntity(i)));
  }

  async findOne(uuid: string) {
    return new StudentEntity(
      await this.prisma.student.findUnique({ where: { uuid } }),
    );
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  async remove(uuid: string) {
    return new StudentEntity(
      await this.prisma.student.delete({
        where: { uuid },
      }),
    );
  }
}
