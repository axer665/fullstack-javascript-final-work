import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GuardJwtAuth } from 'src/guards/authGuard';
import { AuthorisationService } from '@services/authorisation';
import { AuthorisationDto } from '@dto/authorisation/authorisation';
import { SignIn } from '@dto/authorisation/signIn';
import { SignUp } from '@dto/authorisation/signUp';

@Controller('api/auth')
export class AuthorisationController {
  constructor(private authService: AuthorisationService) {}

  @Post('/signin')
  signIn(@Body() signInDto: SignIn): Promise<AuthorisationDto> {
    return this.authService.signIn(signInDto);
  }

  @Post('/signup')
  signUp(@Body() signUpDto: SignUp): Promise<AuthorisationDto> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/checkAuth')
  @UseGuards(GuardJwtAuth)
  checkAuth(
    @Query() data: { email: string },
  ): Promise<{ role: string; id: string }> {
    return this.authService.checkAuth(data);
  }
}
