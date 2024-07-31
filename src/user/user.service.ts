import { UserRepository } from './repo/user.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from 'src/auth/interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todos/entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
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
      .where('user.id = :id', { id: userId })
      .select(['user.username', 'todo.title', 'todo.date', 'todo.completed'])
      .getOne();
  }
}
