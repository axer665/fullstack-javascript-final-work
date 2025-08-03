import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '@services/users';

@Injectable()
export class AuthorisationJWTStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  private logger: Logger = new Logger('strategy');

  async validate(payload) {
    const { email } = payload;
    this.logger.log(payload);
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(
        'Доступно только для авторизованных пользователей',
      );
    }

    return user;
  }
}
