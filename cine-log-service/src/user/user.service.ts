import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>,
  private authService: AuthService){}

  async register(registerData: RegisterUserDto) {
    if(registerData.password !== registerData.repeatPassword)
    {
      throw new BadRequestException("Passwords do not match!");
    }

    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    var user = this.usersRepository.create({email:registerData.email,password: hashedPassword,username: registerData.username});
    await this.usersRepository.save(user);

    const loginData:LoginUserDto = {
      email:registerData.email,
      password: registerData.password
    }

    return this.authService.login(loginData);
    
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({where:{userId: id}}) 
    if(!user)
      throw new BadRequestException('User with that id doesnt exist');
    else
      {
      const { password, ...safeUser } = user;
      return safeUser;
    }
    }
    async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({where:{email: email}}) 
    if(!user)
      throw new BadRequestException('User with that id doesnt exist');
    else
      {
      return user;
    }
    }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
