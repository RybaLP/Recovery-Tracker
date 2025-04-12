import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from "src/user/providers/user.service";
import { User } from "src/user/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UserService) {
      
      const secret = process.env.JWT_SECRET;
      if(!secret){
        throw new Error("secret must be provided in .env")
      }
      
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: secret
      });
    }

    async validate(payload: any): Promise<User | null> {
      const user = await this.usersService.findUserByLogin(payload.sub); 
      return user;
    }
}