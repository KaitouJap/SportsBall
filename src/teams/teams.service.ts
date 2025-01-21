import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PlayersService } from 'src/players/players.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { player, team } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(private db: PrismaService) {}

  /**
   * Create a new team
   * @param createTeamDto Data to create a new team
   */
  async create(createTeamDto: CreateTeamDto): Promise<team> {
    return this.db.team.create({ data: createTeamDto });
  }

  /**
   * Retrieve all teams
   * @returns All teams
   */
  async findAll(): Promise<team[]> {
    return this.db.team.findMany();
  }

  /**
   * Retrieve a single team
   * @param id Team ID
   * @returns The team with the given ID
   */
  async findOne(id: number): Promise<team> {
    const result = await this.db.team.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException(`Team #${id} not found`);
    }
    return result;
  }

  /**
   * Retrieve all teams with their players
   * @returns All teams with their players
   */
  async findAllPlayers(): Promise<(team & { players: player[] })[]> {
    return this.db.team.findMany({
       include: {
        players: true
       }
    });
  }

  /**
   * Update a team
   * @param id Id of the team to update
   * @param updateTeamDto Data to update the team
   * @returns The updated team
   */
  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<team> {
    return this.db.team.update({ where: { id }, data: updateTeamDto });
  }

  /**
   * Delete a team
   * @param id ID of the team to delete
   */
  async remove(id: number): Promise<team> {
    return this.db.team.delete({ where: { id } });
  }

  /**
   * Add a player to a team
   * @param tId Team ID
   * @param pId Player ID
   * @returns The updated team
   */
  async addPlayer(tId: number, pId: number): Promise<team & { players: player[] }> {
    return this.db.team.update({
      data: {
        players: { connect: { id: pId } }
      },
      where: { id: tId },
      include: {
        players: true
      }
    });
  }
}
