import {IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength} from "class-validator"
import {ApiProperty} from "@nestjs/swagger"

export class CreateUserDto{
    @ApiProperty({example:"Bojack__H"})
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    login : string;

    @ApiProperty({example : "strongPassword123!"})
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(25)
    password : string;

    @ApiProperty({example : "bjack47@gmail.com"})
    @IsString()
    @IsEmail()
    email : string;

    @ApiProperty({example : "Bojack"})
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    firstName? : string

    @ApiProperty({example : "Horseman"})
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    lastName? : string;

}