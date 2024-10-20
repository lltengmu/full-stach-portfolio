import { Module } from '@nestjs/common';
import { JWTModule } from './jwt/jwt.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [PrismaModule, StudentModule, JWTModule],
  providers: [],
})
export class AppModule {}
