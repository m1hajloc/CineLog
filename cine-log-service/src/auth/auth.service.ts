import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private jwt: JwtService,
        @Inject(forwardRef(() => UserService))
        private userService:UserService
    ){}


    async login(loginData: LoginUserDto) {
    
        const existing = await this.userService.findOneByEmail(loginData.email);
    
        if(!existing)
          throw new BadRequestException("User with that email doesn't exist!");
    
        const isMatching = await bcrypt.compare(loginData.password, existing.password);
    
        if(!isMatching)
          throw new BadRequestException("Password is not correct!");
        
        return this.signToken(existing.userId, existing.email);
      }
    

     async signToken (
        userId: number,
        email: string
    ): Promise<{access_token: string}> 
    {
        const payload = {
            sub:userId,
            email
        }

        
        const token = await this.jwt.signAsync(payload,{
            expiresIn: '15m',
            secret: 'super-secret'
        });

        return {
            access_token: token
        }
    }

}

