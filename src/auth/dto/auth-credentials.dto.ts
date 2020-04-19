import { IsString, MinLength, MaxLength, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthCredentialsDto {
    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password needs to include 1 uppercase letter, 1 lowercase letter and 1 number or special character.'}
    )
    password: string;
}