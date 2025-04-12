import { IsEmpty, IsString } from "class-validator";

export class RefreshTokenDto{
    @IsString()
    @IsEmpty()
    refreshToken : string;
}