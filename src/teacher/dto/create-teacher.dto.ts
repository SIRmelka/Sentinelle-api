import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateTeacherDto {
  @ApiProperty({
    type: String,
    description: 'Prenom du prof',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Nom du prof',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Numéro du prof',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    type: String,
    description: 'lid de lecole',
  })
  @IsString()
  @IsNotEmpty()
  school: mongoose.Schema.Types.ObjectId;
}
