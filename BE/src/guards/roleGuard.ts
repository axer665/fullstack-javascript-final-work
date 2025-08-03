import {
  Injectable,
  CanActivate,
  ForbiddenException,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class GuardRole implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    // Если ролей нет, то всё ОК - нечего и проверять
    // Этот перехват нужен, чтобы успешно пройти следующую проверку
    if (!roles) {
      return true;
    }

    // Если роли есть, но роли пользователя среди них нет, то отказываем в доступе
    if (!roles.includes(user.role)) {
      throw new ForbiddenException('Доступ запрещен');
    }
    return true;
  }
}
