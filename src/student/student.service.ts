import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Student, StudentDocument } from './entities/student.entity';
import * as bcrypt from 'bcrypt';
import { SchoolService } from 'src/school/school.service';
import { ParentService } from 'src/parent/parent.service';
import { ClassService } from 'src/class/class.service';

@Injectable()
export class StudentService {
  private saltOrRounds = 10;

  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
    private schoolService: SchoolService,
    private parentService: ParentService,
    private classService: ClassService,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<any> {
    const password: string = createStudentDto.password;
    const hash: string = await bcrypt
      .hash(password, this.saltOrRounds)
      .catch((e) => e);

    delete createStudentDto.password;

    const student = new this.studentModel({
      ...createStudentDto,
      password: hash,
    });

    // this.schoolService.addStudent
    const newStudent = await student.save();
    //adding to school
    await this.schoolService.addStudent(
      createStudentDto.school,
      newStudent._id,
    );
    //adding to Parent
    await this.parentService.addStudent(
      createStudentDto.parent,
      newStudent._id,
    );
    //adding to class
    await this.classService.addStudent(createStudentDto.class, newStudent._id);

    return newStudent;
    // return student.save().catch((e) => {
    //   throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    // });
  }

  async findAll() {
    try {
      return await this.studentModel
        .find()
        .populate('school')
        .populate('class');
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: mongoose.Schema.Types.ObjectId): Promise<any> {
    try {
      const resultat = await this.studentModel
        .findOne({ _id: id })
        .populate('school')
        .populate('class');
      return resultat;
    } catch (error) {
      return error.message;
    }
  }

  update(
    id: mongoose.Schema.Types.ObjectId,
    updateStudentDto: UpdateStudentDto,
  ) {
    try {
      return this.studentModel.updateOne({ _id: id }, { updateStudentDto });
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: mongoose.Schema.Types.ObjectId): Promise<string> {
    try {
      const result = await this.studentModel.deleteOne({ _id: id });
      if (result.deletedCount == 0) return 'impossible to remove';
      else return 'student removed successfully';
    } catch (error) {
      return error.message;
    }
  }
}
