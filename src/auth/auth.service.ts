import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserRepository)
        private userRespository: UserRepository,
    ) {}

    async signIn(authDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        const username: string = await this.userRespository.validateUserPassword(authDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { username },
            accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }

    signUp(authDto: AuthCredentialsDto): Promise<User> {
        return this.userRespository.signUp(authDto);
    }
}
