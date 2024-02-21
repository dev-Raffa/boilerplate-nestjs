import { IS_PUBLIC_KEY } from '../../decorators/isPublic/is-public.decrator';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly JWTService: JwtService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if ((await this.isPublic(context)) === true) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = await this.extractToken(request);

    try {
      const payload = await this.JWTService.verifyAsync(token, {
        secret: process.env.JWT_SECRET
      });

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private async extractToken(req: Request) {
    const { user } = req.cookies;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  private async isPublic(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    return isPublic;
  }
}
