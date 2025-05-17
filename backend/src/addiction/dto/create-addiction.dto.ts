import {IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength} from "class-validator"

export class CreateAddictionDto {
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    addictionName : string

    @IsOptional()
    @IsString()
    notes? : string

    @IsNotEmpty()
    @IsDate()
    startTime : Date
}