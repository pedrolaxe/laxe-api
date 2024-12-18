import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site } from './sites.schema';

@Injectable()
export class SitesService {
  constructor(@InjectModel(Site.name) private siteModel: Model<Site>) {}

  async create(site: Partial<Site>): Promise<Site> {
    const newSite = new this.siteModel(site);
    return newSite.save();
  }

  async findAll(): Promise<Site[]> {
    return this.siteModel.find().exec();
  }
}
