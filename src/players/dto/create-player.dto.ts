import { Prisma } from '@prisma/client';
import { IsDate, IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CreatePlayerDto implements Prisma.playerCreateInput {
    @IsString()
    name: string;

    @IsInt()
    @Min(0)
    goalCount: number;

    @IsDateString()
    birthDate: string | Date;
}
