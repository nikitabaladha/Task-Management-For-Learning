import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument, Types } from 'mongoose';
import { UserResponse } from './interfaces/user.interface.js';
import { CreateUserDTO } from './dto/create-user.dto.js';
import { UpdateUserDTO } from './dto/update-user.dto.js';
import { User, UserRole } from './schemas/user.schema.js';
import * as bcrypt from 'bcrypt';
import { MongoServerError } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findUserForAuth(email: string): Promise<HydratedDocument<User> | null> {
    return this.userModel
      .findOne({
        email: email.toLowerCase(),
      })
      .select('+password')
      .exec();
  }

  async getUsers(): Promise<UserResponse[]> {
    const users: HydratedDocument<User>[] = await this.userModel.find().exec();

    return users.map((user): UserResponse => ({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    }));
  }

  async getUserById(id: string): Promise<UserResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async createUser(createUserDto: CreateUserDTO): Promise<UserResponse> {
    const email: string = createUserDto.email.toLowerCase();

    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword: string = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    let newUser: HydratedDocument<User>;

    try {
      newUser = await this.userModel.create({
        name: createUserDto.name,
        email,
        password: hashedPassword,
        role: createUserDto.role ?? UserRole.USER,
      });
    } catch (error: unknown) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }

    return {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      _id: newUser._id.toString(),
    };
  }

  async updateUser(
    id: string,
    updateData: UpdateUserDTO,
  ): Promise<UserResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true },
      )
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return {
      _id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };
  }

  async deleteUser(id: string): Promise<UserResponse> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }

    return {
      _id: deletedUser._id.toString(),
      name: deletedUser.name,
      email: deletedUser.email,
      role: deletedUser.role,
    };
  }
}
