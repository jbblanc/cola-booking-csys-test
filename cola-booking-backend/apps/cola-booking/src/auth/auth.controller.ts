import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidAuthResponseDto } from './dto/valid-auth-response.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: SignupDto): Promise<ValidAuthResponseDto> {
    dto.email = this.getSafeLoginOrEmail(dto.email);
    await this.authService.blockIfUserAlreadyExists(dto.email);
    const result = await this.authService.signUp(dto);
    return result;
  }

  @Post('login')
  @HttpCode(200)
  async logIn(@Body() dto: LoginDto): Promise<ValidAuthResponseDto> {
    dto.email = this.getSafeLoginOrEmail(dto.email);
    return await this.authService.logIn(dto);
  }

  @Post('logout')
  logOut(): any {
    return this.authService.disconnect();
  }

  private getSafeLoginOrEmail(email: string): string {
    if (email) {
      email = email.toLowerCase();
    }
    return email;
  }

}
