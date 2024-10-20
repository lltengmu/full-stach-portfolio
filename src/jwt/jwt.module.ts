import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env['APP_KEY'],
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [PrismaService, JwtStrategy],
})
export class JWTModule {}
