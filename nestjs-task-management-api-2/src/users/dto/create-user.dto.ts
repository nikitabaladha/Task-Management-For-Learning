// import {
//   IsEmail,
//   IsEnum,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   MinLength,
// } from 'class-validator';
// import { UserRole } from '../schemas/user.schema.js';

// export class CreateUserDTO {
//   @IsString()
//   @IsNotEmpty()
//   name!: string;

//   @IsEmail()
//   email!: string;

//   @IsString()
//   @MinLength(8)
//   password!: string;

//   @IsOptional()
//   @IsEnum(UserRole)
//   role?: UserRole;
// }

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../schemas/user.schema.js';

export class CreateUserDTO {
  @ApiProperty({
    example: 'Nikita Baladha',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'nikita@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'StrongPassword123',
    minLength: 8,
    description: 'Password must contain at least 8 characters',
  })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiPropertyOptional({
    enum: UserRole,
    example: UserRole.USER,
    description: 'Role assigned to the user',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
