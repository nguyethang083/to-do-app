import { Role } from 'src/auth/interface/user.interface';
import { Todo } from 'src/todos/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  // one user can have multiple todos
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
