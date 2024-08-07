import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
  Req,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { ZodPipe } from 'src/pipe/zod.pipe';
import { CreateUserZodDto } from './dto/create-user-zod.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  @UsePipes(new ZodPipe(CreateUserZodDto))
  create(@Body() createUserDto: CreateUserZodDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(RoleGuard)
  findAll(@Req() req) {
    console.log(req.user);
    return this.userService.findAll();
  }

  @Get(':id/todos')
  findUserTodos(@Param('id') id: number) {
    return this.userService.findUserWithTodos(+id);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string, @Req() req) {
    console.log(req.user);
    return this.userService.remove(+id);
  }
}
