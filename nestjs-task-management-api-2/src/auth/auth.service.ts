import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';

import type { UserResponse } from '../users/interfaces/user.interface.js';
import { SignupDTO } from './dto/signup.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.userservice.findUserForAuth(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
    user: UserResponse;
  }> {
    const user: UserResponse = await this.validateUser(email, password);

    const payload: {
      sub: string;
      email: string;
      role: UserResponse['role'];
    } = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    const access_token: string = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user,
    };
  }

  async signup(signupDTO: SignupDTO): Promise<UserResponse> {
    const user: UserResponse = await this.userservice.createUser({
      name: signupDTO.name,
      email: signupDTO.email,
      password: signupDTO.password,
    });

    return user;
  }
}
