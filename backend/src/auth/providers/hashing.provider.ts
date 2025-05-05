import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";


/// in case i would change my mind and replace bcrypt with better hashing algorigthm, i created this 
/// class due to implement blue print of hashing method
@Injectable()
export abstract class HashingProvider {
    abstract hashPassword(data : string | Buffer) : Promise<string>;
    abstract comparePassword(data : string | Buffer, encrypted : string) : Promise<boolean>;
}
