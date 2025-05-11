import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(
    @Body()
    jobData: {
      title: string;
      company: string;
      location: string;
      jobType: string;
      salaryMin: number;
      salaryMax: number;
      description: string;
      deadline: string | Date;
      logoSrc?: string;
    },
  ) {
    const job = await this.jobsService.create(jobData);
    return { success: true, newJob: job };
  }

  @Get()
  async findAll() {
    const jobs = await this.jobsService.findAll();
    return {
      success: true,
      data: jobs,
    };
  }
}
