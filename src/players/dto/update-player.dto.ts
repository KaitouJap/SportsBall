import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { Prisma } from '@prisma/client';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
}
