import {IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator"

export class CreateUserDto{
    
    @IsString()
    @MinLength(3)
    @MaxLength(12)
    login : string;

    @MinLength(6)
    @MaxLength(20)
    @IsString()
    password : string;

    @IsString()
    @IsEmail()
    email : string;

    @IsString()
    @MinLength(3)
    @MaxLength(10)
    @IsNotEmpty()
    firstName? : string

    @IsString()
    @MinLength(3)
    @MaxLength(10)
    lastName? : string;

}