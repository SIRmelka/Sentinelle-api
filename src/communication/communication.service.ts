import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import {
  Communication,
  CommunicationDocument,
} from './entities/communication.entity';

@Injectable()
export class CommunicationService {
  constructor(
    @InjectModel(Communication.name)
    private CommunicationModel: Model<CommunicationDocument>,
  ) {}
  create(createCommunicationDto: CreateCommunicationDto) {
    const newCommunication = new this.CommunicationModel({
      ...createCommunicationDto,
    });

    return newCommunication.save();
  }

  async findAll() {
    const communications = await this.CommunicationModel.find();
    return communications;
  }

  async findByClass(id: string) {
    const communications = await this.CommunicationModel.find({
      class: id,
    }).populate({
      path: 'class',
      match: { _id: id },
    });
    return communications;
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.CommunicationModel.findOne({
      _id: id,
    }).populate({
      path: 'class',
      // match: { _id: id },
    });
  }

  update(id: number, updateCommunicationDto: UpdateCommunicationDto) {
    return `This action updates a #${id} communication`;
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    return await this.CommunicationModel.deleteOne({ _id: id });
  }
}
