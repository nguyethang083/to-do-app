import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post(':userId')
  create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @Param('userId') userId: number,
  ) {
    return this.todosService.create(createTodoDto, Number(userId));
  }

  @Get('/findAllNotCompleted/:userId')
  findAllTodosByUserIdNotCompleted(@Param('userId') userId: number) {
    return this.todosService.findAllTodoByUserNotCompleted(Number(userId));
  }

  @Get('/findAllCompleted/:userId')
  findAllTodosByUserIdCompleted(@Param('userId') userId: number) {
    return this.todosService.findAllTodoByUserCompleted(Number(userId));
  }

  @Patch(':id')
  update(@Param('id') id: number) {
    return this.todosService.update(Number(id));
  }

  @Patch(':userId/:id/complete')
  async markAsComplete(
    @Param('userId') userId: number,
    @Param('id') id: number,
  ) {
    return this.todosService.markAsComplete(Number(userId), Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(Number(id));
  }
}
