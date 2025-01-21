import { player } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class Player implements player {
    @ApiProperty({
        description: 'Name of the player',
        example: 'Lionel Messi'
    })
    name: string;

    @ApiProperty({
        description: 'ID of the player',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'Number of goals scored by the player',
        example: 100
    })
    goalCount: number;

    @ApiProperty({
        description: 'Birth date of the player',
        example: '1987-06-24T00:00:00.000Z'
    })
    birthDate: Date;

    @ApiProperty({
        description: 'ID of the team the player belongs to',
        examples: [1, null],
        type: Number,
        nullable: true
    })
    teamId: number | null;
}
