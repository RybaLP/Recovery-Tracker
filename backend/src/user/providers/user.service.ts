import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/createUser.dto.';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dto/loginUser.dto';



@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>
    ){}


    private async hashPassword(password : string) : Promise<string> {
        //// creating salt
        const salt = await bcrypt.genSalt(10);

        //// hashing password
        return bcrypt.hash(password, salt)
    }

    async findUserByLogin(login : string) : Promise<User | null> {
        return this.userRepository.findOneBy({login});
    }

    async findUserById(id : number) : Promise<User | null>{
        return this.userRepository.findOneBy({id});
    }


    public async register(createUserDto : CreateUserDto){
        try {

           const hashedPassword = await this.hashPassword(createUserDto.password);
           const user = this.userRepository.create({...createUserDto, password : hashedPassword});
           await this.userRepository.save(user);

        } catch (error) {
            console.error("Problem with creating new user", error);
        }
    }


    
}

