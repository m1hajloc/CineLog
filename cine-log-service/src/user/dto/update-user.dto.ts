import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  email: string;
  password: string;
  repeatPassword: string;
  username: string;
  oldPassword: string;
}
