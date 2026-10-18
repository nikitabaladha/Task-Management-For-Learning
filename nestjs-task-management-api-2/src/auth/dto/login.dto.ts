// import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// export class LoginDTO {
//   @IsEmail()
//   email!: string;

//   @IsString()
//   @IsNotEmpty()
//   password!: string;
// }

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    example: 'nikita@example.com',
    description: 'Registered email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'StrongPassword123',
    description: 'Account password',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
