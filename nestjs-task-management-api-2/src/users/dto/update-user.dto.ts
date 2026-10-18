// import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
// import type { UserRole } from '../interfaces/user.interface.js';

// export class UpdateUserDTO {
//   @IsOptional()
//   @IsString()
//   @MinLength(2)
//   name?: string;

//   @IsOptional()
//   @IsIn(['Admin', 'User'])
//   role?: UserRole;
// }

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import type { UserRole } from '../interfaces/user.interface.js';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    example: 'Nikita Baladha',
    minLength: 2,
    description: 'Updated name of the user',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({
    enum: ['Admin', 'User'],
    example: 'User',
    description: 'Updated role of the user',
  })
  @IsOptional()
  @IsIn(['Admin', 'User'])
  role?: UserRole;
}
