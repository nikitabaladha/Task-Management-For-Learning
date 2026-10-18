// import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

// export class CreateProjectDTO {
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @IsOptional()
//   @IsString()
//   description?: string;
// }

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDTO {
  @ApiProperty({
    example: 'Task Management API',
    description: 'Name of the project',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 'An API for managing projects and tasks',
    description: 'Description of the project',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
