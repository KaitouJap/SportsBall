import { player, team } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';
import { Player } from "src/players/entities/player.entity";

export class Team implements team {
    @ApiProperty({
        description: 'Name of the team',
        example: 'FC Barcelona'
    })
    name: string;

    @ApiProperty({
        description: 'ID of the team',
        example: 1
    })
    id: number;
}

export class TeamWithPlayers extends Team {
    @ApiProperty({
        description: 'List of players in the team',
        type: [Player],
    })
    players: player[];
}
