import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRespository: UserRepository,
    ) {}

    async signIn(authDto: AuthCredentialsDto) {
        const username: string = await this.userRespository.validateUserPassword(authDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    signUp(authDto: AuthCredentialsDto): Promise<User> {
        return this.userRespository.signUp(authDto);
    }
}
