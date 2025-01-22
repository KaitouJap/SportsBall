import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { match } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatchesService {
  constructor(private db: PrismaService) {}

  /**
   * Create a new match
   * @param createMatchDto Data to create a new match
   * @returns The newly created match
   */
  async create(createMatchDto: CreateMatchDto): Promise<match & { homeTeam: { name: string }; awayTeam: { name: string } }> {
    return await this.db.match.create({
      data: {
        date: createMatchDto.date,
        homeGoals: createMatchDto.homeGoals,
        awayGoals: createMatchDto.awayGoals,
        homeTeam: {
          connect: { id: createMatchDto.homeTeamId },
        },
        awayTeam: {
          connect: { id: createMatchDto.awayTeamId },
        },
      },
      include: { homeTeam: true, awayTeam: true },
    });
  }

  /**
   * Retrieve all matches
   * @returns All matches with their home and away teams
   */
  async findAll(): Promise<(match & { homeTeam: { name: string }; awayTeam: { name: string } })[]> {
    return this.db.match.findMany({ include: { homeTeam: true, awayTeam: true } });
  }

  /**
   * Retrieve a single match
   * @param id Match ID
   * @returns The match with the home and away teams
   */
  async findOne(id: number): Promise<match & { homeTeam: { name: string }; awayTeam: { name: string } }> {
    return this.db.match.findUniqueOrThrow({ where: { id }, include: { homeTeam: true, awayTeam: true } });
  }


  /**
   * Update a match
   * @param id Match ID
   * @param updateMatchDto Data to update the match
   * @returns The updated match with the home and away teams
   */
  async update(id: number, updateMatchDto: UpdateMatchDto): Promise<match & { homeTeam: { name: string }; awayTeam: { name: string } }> {
    return this.db.match.update({
      where: { id },
      data: {
        ...(updateMatchDto.date && { date: updateMatchDto.date }),
        ...(updateMatchDto.homeGoals && { homeGoals: updateMatchDto.homeGoals }),
        ...(updateMatchDto.awayGoals && { awayGoals: updateMatchDto.awayGoals }),
        ...(updateMatchDto.homeTeamId && { homeTeam: { connect: { id: updateMatchDto.homeTeamId } } }),
        ...(updateMatchDto.awayTeamId && { awayTeam: { connect: { id: updateMatchDto.awayTeamId } } }),
      },
      include: { homeTeam: true, awayTeam: true },
    });
  }

  /**
   * Remove a match
   * @param id Match ID
   * @returns The removed match
   */
  async remove(id: number): Promise<match> {
    return this.db.match.delete({ where: { id } });
  }
}
