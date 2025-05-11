import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

enum JobType {
  FullTime = 'FullTime',
  PartTime = 'PartTime',
  Contract = 'Contract',
  Freelance = 'Freelance',
  Internship = 'Internship',
}

@Injectable()
export class JobsService {
  private prisma = new PrismaClient();

  async create(jobData: {
    title: string;
    company: string;
    location: string;
    jobType: string;
    salaryMin: number;
    salaryMax: number;
    description: string;
    deadline: string | Date;
    logoSrc?: string;
  }) {
    // Validate required fields
    if (
      !jobData.title ||
      typeof jobData.title !== 'string' ||
      jobData.title.length < 3
    ) {
      throw new BadRequestException(
        'Title is required and must be at least 3 characters',
      );
    }

    if (
      !jobData.company ||
      typeof jobData.company !== 'string' ||
      jobData.company.length < 2
    ) {
      throw new BadRequestException(
        'Company is required and must be at least 2 characters',
      );
    }

    if (
      !jobData.location ||
      typeof jobData.location !== 'string' ||
      jobData.location.length < 2
    ) {
      throw new BadRequestException(
        'Location is required and must be at least 2 characters',
      );
    }

    if (
      !jobData.jobType ||
      !Object.values(JobType).includes(jobData.jobType as JobType)
    ) {
      throw new BadRequestException('Valid job type is required');
    }

    if (
      !jobData.salaryMin ||
      typeof jobData.salaryMin !== 'number' ||
      jobData.salaryMin <= 0
    ) {
      throw new BadRequestException(
        'Minimum salary is required and must be positive',
      );
    }

    if (
      !jobData.salaryMax ||
      typeof jobData.salaryMax !== 'number' ||
      jobData.salaryMax <= 0
    ) {
      throw new BadRequestException(
        'Maximum salary is required and must be positive',
      );
    }

    if (
      !jobData.description ||
      typeof jobData.description !== 'string' ||
      jobData.description.length < 20
    ) {
      throw new BadRequestException(
        'Description is required and must be at least 20 characters',
      );
    }

    if (!jobData.deadline) {
      throw new BadRequestException('Deadline is required');
    }

    const deadlineDate = new Date(jobData.deadline);
    if (isNaN(deadlineDate.getTime())) {
      throw new BadRequestException('Invalid deadline date');
    }

    // Optional field validation
    if (jobData.logoSrc && typeof jobData.logoSrc !== 'string') {
      throw new BadRequestException('Logo source must be a string');
    }

    return this.prisma.job.create({
      data: {
        ...jobData,
        jobType: jobData.jobType as JobType,
        deadline: deadlineDate,
      },
    });
  }

  async findAll() {
    return this.prisma.job.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
