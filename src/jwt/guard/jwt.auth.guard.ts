import { PUBLIC_ROUTE_KEY } from '@/decorators/SkipAuth.decorator'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }
  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(PUBLIC_ROUTE_KEY, [ctx.getHandler(), ctx.getClass()])
    if (isSkipAuth) return true
    return super.canActivate(ctx)
  }
}
