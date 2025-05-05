import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto.';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { AuthService } from 'src/auth/providers/auth.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository : Repository<User>,

        @Inject(forwardRef(()=>HashingProvider))
        private readonly hashingProvider : HashingProvider
    ){}

    public async createUser(createUserDto : CreateUserDto){

        let existingUser : CreateUserDto | null = null;
        try {
            existingUser = await this.usersRepository.findOne({
                where : {email : createUserDto.email}
            })
        } catch (error) {
            throw new RequestTimeoutException("Unable to process your request at the moment, please try later");
        }

        if(existingUser){
            throw new BadRequestException("User already exists with this Login/Email");
        }

        let newUser = this.usersRepository.create({
            ...createUserDto,
            password : await this.hashingProvider.hashPassword(createUserDto.password)
        })

        try {
            newUser = await this.usersRepository.save(newUser);

        } catch (error) {
            throw new RequestTimeoutException('Unable to process ur request, please try later')            
        }

        return newUser;

    }
}
