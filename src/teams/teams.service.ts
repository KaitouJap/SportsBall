import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PlayersService } from 'src/players/players.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { team } from '@prisma/client';

@Injectable()
export class TeamsService {
  private db: PrismaService;
  private readonly p: PlayersService;
  constructor(db: PrismaService, p: PlayersService) { 
    this.db = db;
    this.p = p;
  }

  async create(createTeamDto: CreateTeamDto) {
    await this.db.team.create({ data: createTeamDto });
  }

  findAll(): Promise<team[]> {
    return this.db.team.findMany();
  }

  async findOne(id: number): Promise<team> {
    const result = await this.db.team.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException(`Team #${id} not found`);
    }
    return result;
  }

  findAllPlayers(): Promise<team[]> {
    return this.db.team.findMany({
       include: {
        players: true
       }
    });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<team> {
    await this.findOne(id);
    return await this.db.team.update({ where: { id }, data: updateTeamDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.db.team.delete({ where: { id } });
  }

  async addPlayer(tId: number, pId: number): Promise<team> {
    await this.findOne(tId);
    await this.p.findOne(pId);
    return await this.db.player.update({
      data: {
        team: { connect: { id: tId } }
      },
      where: { id: pId },
      include: {
        team: true
      }
    });
  }
}
