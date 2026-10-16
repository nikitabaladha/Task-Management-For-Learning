import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateProjectDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
