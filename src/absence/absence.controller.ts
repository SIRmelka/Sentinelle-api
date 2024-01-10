import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import mongoose from 'mongoose';

@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}
  @Post()
  create(@Body() createAbsenceDto: CreateAbsenceDto) {
    return this.absenceService.create(createAbsenceDto);
  }
  //-------------for chat-----------------------

  @Get('/chat/:id')
  findAllForChat(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.absenceService.findAllForChat(id);
  }
  //-------------for chat-----------------------
  @Get('/:id')
  findAll(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.absenceService.findAll(id);
  }
}