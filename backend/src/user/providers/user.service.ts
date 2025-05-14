import { BadRequestException, HttpException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/createUser.dto.';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/providers/auth.service';
import { CreateUserProvider } from './create-user';
// import { LoginUserDto } from '../dto/loginUser.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
        private readonly authService : AuthService,
        private readonly createUserProvider : CreateUserProvider
    ){}

    async findUserByLogin(login : string) : Promise<User | null> {
        return this.userRepository.findOneBy({login});
    }

    async findUserById(id : number) : Promise<User | null>{
        return this.userRepository.findOneBy({id});
    }

    async createUser(createUserDto : CreateUserDto){
        return this.createUserProvider.createUser(createUserDto);
    }
}

