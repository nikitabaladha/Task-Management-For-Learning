// import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

// export class UpdateProjectDTO {
//   @IsOptional()
//   @IsString()
//   @IsNotEmpty()
//   name?: string;

//   @IsOptional()
//   @IsString()
//   description?: string;
// }

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateProjectDTO {
  @ApiPropertyOptional({
    example: 'Updated Task Management API',
    description: 'Updated name of the project',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({
    example: 'Updated description for the project',
    description: 'Updated description of the project',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
