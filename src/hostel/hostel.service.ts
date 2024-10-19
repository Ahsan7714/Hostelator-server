import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHostelDto } from './dto/create-hostel.dto';

@Injectable()
export class HostelService {
  constructor(private prisma: PrismaService) {}

  async createHostel(
    userId: number,
    dto: CreateHostelDto,
  ) {
    try {
      // Create a hostel using the provided data
      const hostel = await this.prisma.hostel.create({
        data: {
          userId,
          ...dto,
        },
      });

      return hostel;
    } catch (error) {
      // Handle any errors that occur during the creation
      throw new BadRequestException(
        'Failed to create hostel. Please check the data provided.',
      );
    }
  }
}
