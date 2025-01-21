import { Prisma } from "@prisma/client";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamDto implements Prisma.teamCreateInput {
    @ApiProperty({
        description: 'Name of the team',
        example: 'FC Barcelona'
    })
    @IsString()
    name: string;
}
