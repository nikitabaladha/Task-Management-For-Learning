import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
