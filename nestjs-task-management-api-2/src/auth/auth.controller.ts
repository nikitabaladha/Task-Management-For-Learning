import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { LoginDTO } from './dto/login.dto.js';
import { SignupDTO } from './dto/signup.dto.js';
import { UserResponse } from '../users/interfaces/user.interface.js';
import { ApiResponseDTO } from '../common/dto/api-response.dto.js';

interface LoginResponse {
  access_token: string;
  user: UserResponse;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDTO: LoginDTO,
  ): Promise<ApiResponseDTO<LoginResponse>> {
    const result = await this.authservice.login(
      loginDTO.email,
      loginDTO.password,
    );

    return {
      success: true,
      message: 'Login successful',
      data: result,
    };
  }

  @Post('signup')
  async signup(
    @Body() signupDTO: SignupDTO,
  ): Promise<ApiResponseDTO<UserResponse>> {
    const user: UserResponse = await this.authservice.signup(signupDTO);

    return {
      success: true,
      message: 'Signup successful',
      data: user,
    };
  }
}
