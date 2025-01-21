import { Prisma } from '@prisma/client';
import { IsDateString, IsInt, IsString, Min } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlayerDto implements Prisma.playerCreateInput {
    @ApiProperty({
        description: 'Name of the player',
        example: 'Lionel Messi'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Number of goals scored by the player',
        example: 100
    })
    @IsInt()
    @Min(0)
    goalCount: number;

    @ApiProperty({
        description: 'Birth date of the player',
        example: '1987-06-24T00:00:00.000Z'
    })
    @IsDateString()
    birthDate: string | Date;
}
