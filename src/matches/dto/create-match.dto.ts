
import { Prisma } from "@prisma/client";
import { IsDateString, IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMatchDto implements Prisma.matchCreateInput {
    @ApiProperty({
        description: 'Date of the match',
        example: '2021-06-24T00:00:00.000Z',
        type: Date
    })
    @IsDateString()
    date: string | Date;

    @ApiProperty({
        description: 'Home team goals',
        example: 1
    })
    @IsInt()
    @Min(0)
    homeGoals: number;

    @ApiProperty({
        description: 'Away team goals',
        example: 2
    })
    @IsInt()
    @Min(0)
    awayGoals: number;

    @ApiProperty({
        description: 'Home team ID',
        example: 1
    })
    @IsInt()
    homeTeamId: number;

    @ApiProperty({
        description: 'Away team ID',
        example: 2
    })
    @IsInt()
    awayTeamId: number;
}
