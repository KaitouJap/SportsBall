import { match } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Team } from 'src/teams/entities/team.entity';

export class Match implements match {
    
    @ApiProperty({
        description: 'ID of the match',
        example: 1
    })
    id: number;

    @ApiProperty({
        description: 'Date of the match',
        example: '2021-06-24T00:00:00.000Z'
    })
    date: Date;

    @ApiProperty({
        description: 'ID of the home team',
        example: 1
    })
    homeTeamId: number;

    @ApiProperty({
        description: 'ID of the away team',
        example: 2
    })
    awayTeamId: number;

    @ApiProperty({
        description: 'Number of goals scored by the home team',
        example: 3
    })
    homeGoals: number;

    @ApiProperty({
        description: 'Number of goals scored by the away team',
        example: 2
    })
    awayGoals: number;
}

export class MatchWithTeamNames extends Match {
    @ApiProperty({
        description: 'Name of the home team',
        example: { name: 'Real Madrid', id: 1 },
        type: Team,
    })
    homeTeam: {
        name: string;
        id: number;
    };

    @ApiProperty({
        description: 'Name of the away team',
        example: { name: 'Barcelona', id: 2 },
        type: Team,
    })
    awayTeam: {
        name: string;
        id: number;
    }
}