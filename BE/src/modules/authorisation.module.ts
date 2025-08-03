import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@modules/users.module';
import { AuthorisationController } from '@controllers/authorisation';
import { AuthorisationService } from '@services/authorisation';
import { AuthorisationJWTStrategy } from '@helpers/authorisationJWT.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    UsersModule,
  ],
  controllers: [AuthorisationController],
  providers: [AuthorisationService, AuthorisationJWTStrategy],
  exports: [AuthorisationService, AuthorisationJWTStrategy, PassportModule],
})
export class AuthorisationModule {}
