import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;
  @MinLength(6)
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  repeatPassword: string;
  @MinLength(6)
  @IsNotEmpty()
  username: string;
  @MinLength(6)
  @IsNotEmpty()
  oldPassword: string;
}
