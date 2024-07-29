import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../interface/user.interface';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: Role;
}
