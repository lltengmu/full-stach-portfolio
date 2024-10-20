import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import ValidatePipe from './pipes/validate.pipe'
import { ResponseInterceptor } from './interceptors/response.interceptor'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true })
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalPipes(new ValidatePipe({ transform: true }))
  app.setGlobalPrefix('api')
  app.useStaticAssets('uploads', { prefix: '/uploads' })
  app.useStaticAssets('public', { prefix: '/public' })
  await app.listen(3010)
}
bootstrap()