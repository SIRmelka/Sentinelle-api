import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OptionService } from './option.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// @UseGuards(JwtAuthGuard)
@ApiTags('option')
@ApiBearerAuth()
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionService.create(createOptionDto);
  }

  @Get()
  findAll() {
    return this.optionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.optionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() updateOptionDto: UpdateOptionDto,
  ) {
    return this.optionService.update(id, updateOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.optionService.remove(id);
  }
}
