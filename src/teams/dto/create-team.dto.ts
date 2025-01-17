import { Prisma } from "@prisma/client";
import { IsString } from "class-validator";

export class CreateTeamDto implements Prisma.teamCreateInput {
    @IsString()
    name: string;
}
