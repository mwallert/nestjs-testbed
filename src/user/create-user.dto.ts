import { IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    last_name: string;
}