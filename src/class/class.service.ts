import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { SchoolService } from 'src/school/school.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class, ClassDocument } from './entities/class.entity';
import { OptionService } from 'src/option/option.service';
@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private ClassModel: Model<ClassDocument>,
    private schoolService: SchoolService,
    private optionService: OptionService,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const classe = new this.ClassModel({
      ...createClassDto,
    });

    const newClass = await classe.save();
    //  addtoSchool
    await this.schoolService.addClass(createClassDto.school, newClass._id);
    // addtoOption
    await this.optionService.addClass(createClassDto.option, newClass._id);
    return newClass;
  }

  async findAll() {
    const classes = await this.ClassModel.find()
      .populate({ path: 'school', select: { _id: 1, name: 1 } })
      .populate('option');
    return classes;
  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    return await this.ClassModel.findOne({ _id: id })
      .populate({ path: 'school', select: { _id: 1, name: 1 } })
      .populate('option');
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateClassDto: UpdateClassDto,
  ) {
    return await this.ClassModel.updateOne({ _id: id }, { updateClassDto });
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
  async addStudent(id: mongoose.Schema.Types.ObjectId, student: any) {
    return await this.ClassModel.updateOne(
      { _id: id },
      { $push: { students: student } },
    );
  }
}
