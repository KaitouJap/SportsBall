import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { match } from '@prisma/client';
import { MatchWithTeamNames } from './entities/match.entity';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new match' })
  @ApiResponse({ status: 201, description: 'The match has been successfully created.', type: MatchWithTeamNames })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Team not found.' })
  @ApiBody({ type: CreateMatchDto })
  async create(@Body() createMatchDto: CreateMatchDto): Promise<match & { homeTeam: { name: string }; awayTeam: { name: string } }> {
    return this.matchesService.create(createMatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all matches' })
  @ApiResponse({ status: 200, description: 'All matches with their home and away teams', type: [MatchWithTeamNames] })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<(match & { homeTeam: { name: string }; awayTeam: { name: string } })[]> {
    return this.matchesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single match' })
  @ApiResponse({ status: 200, description: 'The match with the home and away teams', type: MatchWithTeamNames })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  @ApiParam({ name: 'id', type: 'number' })
  async findOne(@Param('id') id: string): Promise<match & { homeTeam: { name: string }; awayTeam: { name: string } }> {
    return this.matchesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a match' })
  @ApiResponse({ status: 200, description: 'The updated match with the home and away teams', type: MatchWithTeamNames })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateMatchDto })
  async update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto): Promise<match & { homeTeam: { name: string }; awayTeam: { name: string }}> {
    return this.matchesService.update(+id, updateMatchDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete a match' })
  @ApiResponse({ status: 204, description: 'The match has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  @ApiParam({ name: 'id', type: 'number' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.matchesService.remove(+id);
  }
}
