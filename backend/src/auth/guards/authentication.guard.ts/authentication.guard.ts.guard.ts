import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuardTsGuard implements CanActivate {

  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap : Record<AuthType, CanActivate | CanActivate[]>;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap 
      =
    {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true }
    };
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {


    const authTypes = this.reflector.getAllAndOverride(
      AUTH_TYPE_KEY, 
      [context.getHandler(), context.getClass()]
    ) ?? [AuthenticationGuardTsGuard.defaultAuthType];

    console.log(authTypes);
    const guards = authTypes.map((type)=>this.authTypeGuardMap[type]).flat();
    console.log(guards)

    const error = new UnauthorizedException();

    for(const instance of guards){
      const canActivate = await Promise.resolve(
        instance.canActivate(context)
      ).catch((err)=>{error : err});

      if(canActivate){
        return true
      }
    }
    
    throw error;
  }
}
