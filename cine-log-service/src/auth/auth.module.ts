import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [forwardRef(() => UserModule), JwtModule.register({})],
    controllers: [AuthController],
    exports:[AuthService],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
