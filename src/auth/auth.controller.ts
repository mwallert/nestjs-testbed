import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @ApiBody({ type: AuthCredentialsDto })
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    }
}
