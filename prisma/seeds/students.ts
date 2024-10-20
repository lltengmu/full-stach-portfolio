import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';
import create from '../helper';
import { nanoid } from "nanoid"

export default () => {
  create(20, async (prisma: PrismaClient) => {
    await prisma.student.create({
      data: {
        email: Random.email(),
        age: Random.natural(20, 30),
        studentId: Random.natural(10000, 999999),
        name: Random.name(),
        address: Random.county(true),
        uuid:nanoid()
      },
    });
  });
};
