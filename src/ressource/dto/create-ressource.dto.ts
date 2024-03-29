import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

enum RessourceType {
  video,
  pdf,
}
export class CreateRessourceDto {
  @ApiProperty({
    type: String,
    description: '',
  })
  @IsString()
  title: string;
  @ApiProperty({
    type: String,
    description: '',
  })
  @IsString()
  detail: string;
  @ApiProperty({
    type: String,
    description: '',
  })
  @IsString()
  type: RessourceType;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'field',
  })
  @IsNotEmpty()
  field: mongoose.Schema.Types.ObjectId;
}
