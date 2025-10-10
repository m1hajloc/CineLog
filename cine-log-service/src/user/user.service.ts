import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { emit } from 'process';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async register(registerData: RegisterUserDto) {
    try {
      if (registerData.password !== registerData.repeatPassword) {
        throw new BadRequestException('Passwords do not match!');
      }

      if (
        await this.usersRepository.findOne({
          where: { email: registerData.email },
        })
      )
        throw new BadRequestException('Email already in use');

      if (await this.findOneByUsername(registerData.username))
        throw new BadRequestException('Username already in use');

      const hashedPassword = await bcrypt.hash(registerData.password, 10);

      var user = this.usersRepository.create({
        email: registerData.email,
        password: hashedPassword,
        username: registerData.username,
      });
      await this.usersRepository.save(user);
      const { password, ...result } = user;
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async me(user: User) {
    return await this.usersRepository.findOne({
      where: { userId: user.userId },
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { userId: id } });
    if (!user) throw new BadRequestException('User with that id doesnt exist');
    else {
      const { password, ...safeUser } = user;
      return safeUser;
    }
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user)
      throw new BadRequestException('User with that email doesnt exist');
    else {
      return user;
    }
  }

  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username: username },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { userId: id },
    });
    if (!user) throw new NotFoundException('User not found');

    if (
      user.email !== updateUserDto.email &&
      (await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      }))
    )
      throw new BadRequestException('Email already in use');

    if (
      user.username !== updateUserDto.username &&
      (await this.usersRepository.findOne({
        where: { username: updateUserDto.username },
      }))
    )
      throw new BadRequestException('Username already in use');
    if (updateUserDto.password !== updateUserDto.repeatPassword) {
      throw new BadRequestException('Passwords do not match!');
    }

    if (
      updateUserDto.oldPassword &&
      updateUserDto.password &&
      updateUserDto.repeatPassword &&
      !(await bcrypt.compare(updateUserDto.oldPassword, user.password))
    )
      throw new BadRequestException('Old password is not correct');

    user.email = updateUserDto.email;
    user.username = updateUserDto.username;

    console.log(user);
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      user.password = hashedPassword;
    }

    return this.usersRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
