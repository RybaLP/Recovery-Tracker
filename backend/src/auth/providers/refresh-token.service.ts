import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RefreshToken } from "../refreshToken.entity";
import { User } from "src/user/user.entity";
import {v4 as uuid} from "uuid"
import * as bcrypt from "bcrypt"

@Injectable()
export class RefreshTokenService{
    constructor(@InjectRepository(RefreshToken)
    private readonly refreshTokenRepository : Repository<RefreshToken>
    ){}

    async generateRefreshToken(user : User, expiresIn : number = 7*24*60*1000){
        const token = uuid()
        const hashedToken = await bcrypt.hash(token, 10)
        const expiresAt = new Date(Date.now() + expiresIn);

        const refreshToken = this.refreshTokenRepository.create({
            userId : user.id,
            token : hashedToken,
            expiresAt, 
            user
        })

        return this.refreshTokenRepository.save(refreshToken);
    }

    async findRefreshToken(token : string) : Promise<RefreshToken | null>{
        return this.refreshTokenRepository.findOne({
            where : {token}
        })
    }

    async findRefreshTokenByUserId(userId : number) : Promise<RefreshToken | null>{
        return this.refreshTokenRepository.findOneBy({userId})
    }

    async deleteRefreshToken(token : string) : Promise<void> {
        this.refreshTokenRepository.delete({token})
    }

    async deleteRefreshTokenByUserId(userId : number) : Promise<void>{
        this.refreshTokenRepository.delete({
            userId
        })
    }

}