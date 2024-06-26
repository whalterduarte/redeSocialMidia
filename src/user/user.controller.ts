import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard'
import type { Multer } from 'multer';
import { CustomUserGuard } from 'src/auth/auth.user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post('register')
  @UseInterceptors(FileInterceptor('file')) 
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Multer.File) {
    const createUserDtoWithFile = { ...createUserDto, file };
    return this.userService.create(createUserDtoWithFile);
  }
  @UseGuards(AuthGuard)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @UseGuards(AuthGuard, CustomUserGuard)
  @Patch('profile/:username')
  update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(username, updateUserDto);
  }

 
}
