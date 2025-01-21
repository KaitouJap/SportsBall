import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { player, team } from '@prisma/client';
import { Team, TeamWithPlayers } from './entities/team.entity';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new team' })
  @ApiResponse({ status: 201, description: 'The team has been successfully created.', type: Team })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: CreateTeamDto })
  async create(@Body() createTeamDto: CreateTeamDto): Promise<team> {
    return this.teamsService.create(createTeamDto);
  }

  @Post('/:teamid/addPlayer/:playerid')
  @ApiOperation({ summary: 'Add a player to a team' })
  @ApiResponse({ status: 201, description: 'The player has been successfully added to the team.', type: TeamWithPlayers })
  @ApiResponse({ status: 404, description: 'Team or player not found.' })
  @ApiParam({ name: 'teamid', required: true, description: 'ID of the team' })
  @ApiParam({ name: 'playerid', required: true, description: 'ID of the player' })
  async addPlayerToTeam(@Param('teamid') teamid: string, @Param('playerid') playerid: string): Promise<team & { players: player[] }>{
    return this.teamsService.addPlayer(+teamid, +playerid);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all teams' })
  @ApiResponse({ status: 200, description: 'The teams have been successfully retrieved.', type: [Team] })
  async findAll(): Promise<team[]> {
    return this.teamsService.findAll();
  }

  @Get('/players')
  @ApiOperation({ summary: 'Retrieve all teams with their players' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all teams with their players.', type: [TeamWithPlayers] })
  async findAllPlayers(): Promise<(team & { players: player[] })[]> {
    return this.teamsService.findAllPlayers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single team by ID' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the team.', type: Team })
  @ApiResponse({ status: 404, description: 'Team not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the team' })
  async findOne(@Param('id') id: string): Promise<team> {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a team' })
  @ApiResponse({ status: 200, description: 'The team has been successfully updated.', type: Team })
  @ApiResponse({ status: 404, description: 'Team not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the team' })
  @ApiBody({ type: UpdateTeamDto, required: false })
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto): Promise<team> {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a team' })
  @ApiResponse({ status: 204, description: 'The team has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Team not found.' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the team' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.teamsService.remove(+id);
  }
}
