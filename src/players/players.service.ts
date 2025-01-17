import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayersService {
  private db: PrismaService;
  constructor(db: PrismaService) { this.db = db; }

  async create(createPlayerDto: CreatePlayerDto) {
    await this.db.player.create({ 
      data: {
        ...createPlayerDto,
        birthDate: new Date(createPlayerDto.birthDate),
      }
     });
  }

  findAll(): Promise<Player[]> {
    return this.db.player.findMany();
  }

  async findOne(id: number): Promise<Player> {
    const result = await this.db.player.findUnique({ where: { id } });
    if (!result) {
      throw new NotFoundException(`Player #${id} not found`);
    }
    return result;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    await this.findOne(id);
    return await this.db.player.update({
      where: {
        id
      },
      data: {
        ...updatePlayerDto,
        birthDate: new Date(updatePlayerDto.birthDate),
      }
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.db.player.delete({
      where: { id }
    });
  }
}
