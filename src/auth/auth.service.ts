import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { IAuthenticate, Role } from './interface/user.interface';
import { sign } from 'jsonwebtoken';
import { AuthenticateDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  users = [
    {
      userId: faker.datatype.uuid(),
      userName: 'Hang',
      password: '123',
      role: Role.ADMIN,
    },
    {
      userId: faker.datatype.uuid(),
      userName: 'Bong',
      password: '123',
      role: Role.USER,
    },
  ];

  authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
    const user = this.users.find(
      (u) =>
        u.userName === authenticateDto.userName &&
        u.password === authenticateDto.password,
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = sign({ ...user }, 'secret');

    return { token, user };
  }
}
