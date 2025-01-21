import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { player, team } from '@prisma/client';

@Injectable()
export class PlayersService {
  constructor(private db: PrismaService) {}

  /**
   * Create a new player
   * @param createPlayerDto Data to create a new player
   * @returns Created player
   */
  async create(createPlayerDto: CreatePlayerDto): Promise<player> {
    return this.db.player.create({ 
      data: {
        ...createPlayerDto,
      }
     });
  }

  /**
   * Find all players
   * @returns List of players with team information
   */
  async findAll(): Promise<(player & team)[]> {
    return this.db.player.findMany({ include: { team: true } });
  }

  /**
   * Find a player by ID
   * @param id Player ID
   * @returns Player with team information
   */
  async findOne(id: number): Promise<player & team> {
    return this.db.player.findFirstOrThrow({ where: { id }, include: { team: true } });
  }

  /**
   * Update a player
   * @param id Player ID
   * @param updatePlayerDto Data to update a player
   * @returns Updated player
   */
  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<player> {
    return this.db.player.update({
      where: {
        id
      },
      data: {
        ...updatePlayerDto,
      }
    });
  }

  /**
   * Remove a player
   * @param id Player ID
   * @returns Removed player
   */
  async remove(id: number): Promise<player> {
    return this.db.player.delete({
      where: { id }
    });
  }
}
