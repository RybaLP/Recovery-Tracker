import { BadRequestException, HttpException, Injectable, RequestTimeoutException } from '@nestjs/common';
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

    async findUserByLogin(login : string) : Promise<User | null> {
        return this.userRepository.findOneBy({login});
    }

    async findUserById(id : number) : Promise<User | null>{
        return this.userRepository.findOneBy({id});
    }


    
    public async register(createUserDto : CreateUserDto){

        let existingUser : User | null = null;

        const salt = await bcrypt.genSalt(10);
        let hashedPassword = '';

        if(!createUserDto){
            throw new BadRequestException("Couldn't find the register properties");
        }

        try {
          // check if user exists with same email
          existingUser = await this.userRepository.findOne({
            where: [
                {email : createUserDto.email},
                {login : createUserDto.login}
            ]
          })
          if(existingUser){
            if(createUserDto.email === existingUser.email || createUserDto.login === existingUser.login){
                throw new BadRequestException("User already exists with this Login/Email");
            }
          }
        } catch (error) {
          // if findOne will not work
          throw new RequestTimeoutException(
            'Unable to process your request at the moment please try later',
            {
              description: 'Error connecting to the database',
            },
          );
        }

        /// hashing password 
        try {
            hashedPassword = await bcrypt.hash(createUserDto.password, salt);    
        } 
        catch (error) {
            throw new BadRequestException("Couldn't hash the password");
        }

        try {
            let user = this.userRepository.create({...createUserDto, password : hashedPassword});
            await this.userRepository.save(user);
            return {user, message : "Created successfuly! "}
        } catch (error) {
            throw new RequestTimeoutException("Server error");
        }          
    }
}

