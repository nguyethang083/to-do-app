import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User]), UserModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
