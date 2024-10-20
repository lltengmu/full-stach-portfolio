import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JWTModule } from './jwt/jwt.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [PrismaModule, AuthModule, StudentModule, JWTModule],
  providers: [],
})
export class AppModule {}
