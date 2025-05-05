import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from 'src/user/dto/loginUser.dto';
import { UserService } from 'src/user/providers/user.service';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignIn {
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,

        private readonly hashingProvider : HashingProvider,

        @Inject(forwardRef(()=>UserService))
        private readonly userSerice : UserService
    ){}

    public signIn = async (loginUserDto : LoginUserDto) => {
        let existingUser : User | null = null;

        try {
            existingUser = await this.userRepository.findOne({
                where : {
                    login : loginUserDto.login
                }
            })
        } catch (error) {
            throw new RequestTimeoutException(error, {description : "Could not fetch the user"})
        }

        if(!existingUser){
            throw new BadRequestException("User with this login does not exist");
        }

        try {
            await this.hashingProvider.comparePassword(existingUser.password, loginUserDto.password)
        }
        catch (error) {
            throw new BadRequestException("Provided password does not match to account");
        }
        

    }

    



}
