import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/auth/interface/user.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = Role.USER;
    return this.userRepository.save(user);
  }

  findUserByID(id: number) {
    return this.userRepository.findOneOrFail({ where: { id: id } });
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async findUserWithTodos(userId: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.todos', 'todo')
      .select(['user.firstName', 'todo.title', 'todo.date', 'todo.completed'])
      .where('user.id = :id', { id: userId })
      .getOne();
  }
}
