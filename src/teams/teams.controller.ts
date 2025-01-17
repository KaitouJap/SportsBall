import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Post('/:teamid/addPlayer/:playerid')
  addPlayerToTeam(@Param('teamid') teamid: string, @Param('playerid') playerid: string){
    return this.teamsService.addPlayer(+teamid, +playerid);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get('/players')
  findAllPlayers(){
    return this.teamsService.findAllPlayers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.teamsService.remove(+id);
  }
}
