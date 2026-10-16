import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import type { UserRole } from '../interfaces/user.interface.js';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsIn(['Admin', 'User'])
  role?: UserRole;
}
