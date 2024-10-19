import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
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
      console.log(error)
      throw new BadRequestException(
        'Failed to create hostel. Please check the data provided.',
      );
    }
  }

  // get all hostels 
  async getAllHostels() {
    try {
      const hostels = await this.prisma.hostel.findMany();
      console.log(hostels) 
      return hostels;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to retrieve hostels.');
    }
  }
  // get single hostel
  async getHostelById(id: number) {
    try {
      const hostel = await this.prisma.hostel.findUnique({
        where: { id },
      });

      if (!hostel) {
        throw new NotFoundException('Hostel not found.');
      }

      return hostel;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to retrieve hostel.');
    }
  }
  // delete hostel by id
  async deleteHostel(id: number, userId: number) {
    try {
      const hostel = await this.prisma.hostel.findUnique({
        where: { id },
      });

      if (!hostel) {
        throw new NotFoundException('Hostel not found.');
      }

      // Check if the user is the creator of the hostel
      if (hostel.userId !== userId) {
        throw new ForbiddenException('You are not allowed to delete this hostel.');
      }

      // Delete the hostel
      await this.prisma.hostel.delete({
        where: { id },
      });

      return { message: 'Hostel deleted successfully.' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to delete hostel.');
    }
  }
  async updateHostel(id: number, userId: number, dto: CreateHostelDto) {
    try {
      const hostel = await this.prisma.hostel.findUnique({
        where: { id },
      });

      if (!hostel) {
        throw new NotFoundException('Hostel not found.');
      }

      // Check if the user is the creator of the hostel
      if (hostel.userId !== userId) {
        throw new ForbiddenException('You are not allowed to update this hostel.');
      }

      // Update the hostel
      const updatedHostel = await this.prisma.hostel.update({
        where: { id },
        data: { ...dto },
      });

      return updatedHostel;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to update hostel.');
    }
  }
// get hostel user
  async getHostelsByUserId(userId: number) {
    try {
      
      const hostels = await this.prisma.hostel.findMany({
        where: {
          userId: userId,
        },
      });
      return hostels;
    } catch (error) {
      // console.log(error);
      throw new BadRequestException('Failed to retrieve hostels for this user.');
    }
  }
}
