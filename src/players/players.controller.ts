import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { player } from '@prisma/client';
import { Player } from './entities/player.entity';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new player' })
  @ApiResponse({ status: 201, description: 'The player has been successfully created.', type: Player })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreatePlayerDto })  
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<player> {
    return this.playersService.create(createPlayerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all players' })
  @ApiResponse({ status: 200, description: 'The players have been successfully retrieved.', type: [Player] })
  async findAll(): Promise<player[]> {
    return this.playersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single player by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the player.', type: Player })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the player' })
  async findOne(@Param('id') id: string): Promise<player> {
    return this.playersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a player' })
  @ApiResponse({ status: 200, description: 'The player has been successfully updated.', type: Player })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the player' })
  @ApiBody({ type: UpdatePlayerDto, required: false })
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto): Promise<player> {
    return this.playersService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remove a player' })
  @ApiResponse({ status: 204, description: 'The player has been successfully removed.' })
  @ApiResponse({ status: 404, description: 'Player not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the player' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.playersService.remove(+id);
  }
}
