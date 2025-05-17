import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class EditAddictionDto {
    @IsString()
    @MinLength(3)
    @MaxLength(40)
    @IsOptional()
    addictionName? : string

    @IsOptional()
    @IsString()
    notes? : string

    @IsNotEmpty()
    @IsDate()
    @IsOptional()
    startTime? : Date
    
}
