import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/user.entity";
import { Addiction } from "../addiction.entity";
import { CreateAddictionDto } from "../dto/create-addiction.dto";
import { UserService } from "src/user/providers/user.service";
import { ActiveUserData } from "src/auth/interfaces/active-user-data.interface";

@Injectable()
export class CreateAddictionProvider {
    constructor(

        private readonly userService: UserService,
        @InjectRepository(Addiction)
        private readonly addictionRepository: Repository<Addiction>
    ) { }


    public async createAddiction(createAddictionDto: CreateAddictionDto, user: ActiveUserData) {

        let author;

        try {
            author = await this.userService.findUserById(user.sub);
        } catch (error) {
            throw new ConflictException(error)
        }

        let addiction = this.addictionRepository.create({
            ...createAddictionDto,
            user: author
        })

        try {
            return await this.addictionRepository.save(addiction);
        } catch (error) {
            throw new ConflictException(error, {
                description: "Ensure addiction is unique and not a duplicate"
            });
        }
    }
}