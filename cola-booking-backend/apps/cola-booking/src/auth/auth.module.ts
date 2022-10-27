import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '../../config/jwt.config';
import { AuthGuard } from './auth.guard';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [JwtModule.register(jwtConfig), forwardRef(() => AccountModule)],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
