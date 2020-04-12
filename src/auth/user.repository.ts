import { Repository, EntityRepository } from "typeorm";
import { User} from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException } from "@nestjs/common";

import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authDto: AuthCredentialsDto): Promise<User> {
        const user: User = new User(),
            salt = await bcrypt.genSalt();

        authDto.password = await this.hashPassword(authDto.password, salt);

        Object.assign(user, {
            ...authDto,
            salt
        });

        try {
            return await user.save();
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(`Username: ${authDto.username} already exists`);
            }

            throw error;
        }
    }

    public async validateUserPassword(authCredDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredDto,
            user: User = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        }

        return null;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}