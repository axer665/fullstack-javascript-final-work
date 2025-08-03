import {
  ExecutionContext,
  UnauthorizedException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GuardJwtAuth extends AuthGuard('jwt') {
  public canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  private logger: Logger = new Logger('guard');

  public handleRequest(err: any, user: any) {
    this.logger.log(user);
    // Пользователь должен быть
    if (!user) {
      throw new UnauthorizedException(
        'Недоступно для неавторизованных пользователей',
      );
    }

    // Перехватываем ошибку, если она есть
    if (err) {
      throw err;
    }

    // Всё прошло хорошо - возвращаем пользователя
    return user;
  }
}
