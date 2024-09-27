import { BaseMongoRepository } from './baseMongoRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Professional, ProfessionalDocument } from 'src/schemas/Professional.schema';

@Injectable()
export class ProfessionalMongoRepository extends BaseMongoRepository<Professional> {
  constructor(@InjectModel(Professional.name) private entity: Model<ProfessionalDocument>) {
    super(entity);
  }

  async getHeaders() {
    return await this.entity.find({}, { _id: 1, name: 1 }).exec();
  }
}
