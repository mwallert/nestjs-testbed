import { Controller, Get, ValidationPipe, Body, Post, UsePipes, Put, Param, ParseIntPipe } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { GameUser } from './game-user.entity';
import { GameUserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './create-user.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UserController extends BaseController<GameUser, CreateUserDto> {
    constructor(
        @InjectRepository(GameUserRepository)
        public userRepository: GameUserRepository
    ) {
        super(userRepository);
    }

    @ApiBody({ type: CreateUserDto })
    @Post()
    createUser(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.create(createUserDto);
    }

    @Put(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserDto: CreateUserDto
    ) {
        return this.update(id, createUserDto);
    }
}
