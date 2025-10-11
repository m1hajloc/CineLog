import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async login(loginData: LoginUserDto) {
    const existing = await this.userService.findOneByEmail(loginData.email);

    if (!existing)
      throw new BadRequestException('User with that email does not exist!');

    const isMatching = await bcrypt.compare(
      loginData.password,
      existing.password,
    );

    if (!isMatching) throw new BadRequestException('Password is not correct!');

    return this.signToken(
      existing.userId,
      existing.email,
      existing.username,
      existing.admin,
    );
  }

  async signToken(
    userId: number,
    email: string,
    username: string,
    admin: boolean,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      username,
      admin,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
