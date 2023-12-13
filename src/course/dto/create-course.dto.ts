import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCourseDto {
  @ApiProperty({
    type: String,
    description: " l'id de la filière du cours",
  })
  @IsNotEmpty()
  @IsString()
  field: mongoose.Schema.Types.ObjectId;

  @ApiProperty({
    type: String,
    description: " l'id du Prof",
  })
  @IsNotEmpty()
  @IsString()
  teacher: mongoose.Schema.Types.ObjectId;
}
