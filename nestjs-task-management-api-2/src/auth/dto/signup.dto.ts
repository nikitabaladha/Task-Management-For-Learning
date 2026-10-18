// import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// export class SignupDTO {
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsEmail()
//   @IsNotEmpty()
//   email: string;

//   @IsString()
//   @MinLength(8)
//   password: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDTO {
  @ApiProperty({
    example: 'Nikita Baladha',
    description: 'Full name of the user',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'nikita@example.com',
    description: 'Email address for the new account',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: 'StrongPassword123',
    minLength: 8,
    description: 'Password must contain at least 8 characters',
  })
  @IsString()
  @MinLength(8)
  password!: string;
}
