import { Controller, Get, Post, Body } from '@nestjs/common';
import { SitesService } from './sites.service';
import { Site } from './sites.schema';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Post()
  async create(@Body() site: Partial<Site>): Promise<Site> {
    return this.sitesService.create(site);
  }

  @Get()
  async findAll(): Promise<Site[]> {
    return this.sitesService.findAll();
  }
}
