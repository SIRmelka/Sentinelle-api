import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Numéro de téléphone congolais à 10 chiffres',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Le numero doit être au format de 10 chiffres' })
  public phoneNumber: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  public password: string;

  @ApiProperty({
    type: String,
    description: 'admin or user',
  })
  @IsString()
  @IsNotEmpty()
  public role: string;
  public school: mongoose.Schema.Types.ObjectId;
}
