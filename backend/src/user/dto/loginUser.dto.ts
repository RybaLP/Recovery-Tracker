import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
     @IsString()
     @IsNotEmpty()
     @MinLength(3)
     @MaxLength(10)
     login : string;

     @IsString()
     @IsNotEmpty()
     @MinLength(5)
     @MaxLength(25)
     password : string;
}