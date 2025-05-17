import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Addiction } from "../addiction.entity";
import { Repository } from "typeorm";
import { ActiveUserData } from "src/auth/interfaces/active-user-data.interface";

export class FetchAddictionsProvider {

    constructor(
        @InjectRepository(Addiction)
        private readonly addictionRepository : Repository<Addiction>
    ){}

    //// fetching all but its unnecesary for this project lol
    public fetchAddictions = async () => {
        try {
            const addictions = await this.addictionRepository.find({});
            if (!addictions) {
                throw new Error("")
            }
            return addictions;

        } catch (error) {
            throw new Error(error);
        }
    }

    public fetchAddictionsUser = async (user: ActiveUserData): Promise<Addiction[]> => {
        try {
            const addictions = await this.addictionRepository.find({
                where: {
                    user: { id: user.sub }
                },
                relations: ['user']
            })

            return addictions

        } catch (error) {
            throw new Error("Failed to fetch addictions for user")
        }
    }

}