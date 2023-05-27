import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose/dist';
import { Type } from 'class-transformer';
import mongoose, { Types } from 'mongoose';
import { Class } from 'src/class/entities/class.entity';
import { School } from 'src/school/entities/school.entity';

export type StudentDocument = Student & Document;
@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  phoneNumber: string;
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  middleName: string;
  @Prop({ required: true, enum: ['F', 'M'] })
  sex: string;
  @Prop({ required: true })
  birthDate: string;
  @Prop({ required: true })
  nationality: string;
  @Prop({ required: true })
  password: string;
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: School.name,
  })
  @Type(() => School)
  school: School;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Class.name,
  })
  @Type(() => Class)
  class: Class;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
