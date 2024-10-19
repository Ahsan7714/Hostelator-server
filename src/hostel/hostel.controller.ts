import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { CreateHostelDto } from './dto/create-hostel.dto';
import { HostelService } from './hostel.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('hostel')
export class HostelController {
    constructor(
        private hostelService: HostelService,
      ) {}
    @UseGuards(JwtGuard)  
    @Post('create')
    createHostel(
        @GetUser('id') userId : number,
        @Body() dto:CreateHostelDto,
    ){
        console.log(userId,dto)
        return this.hostelService.createHostel(
            userId,
            dto,
        )
    }
    @Get()
    getAllHostels()
    {
      return  this.hostelService.getAllHostels();
    }

    @Get('user') // Endpoint to get hostels created by the logged-in user
  @UseGuards(JwtGuard)
  getHostelsByUser(@GetUser('id') userId: number) {
    console.log(userId)
    return this.hostelService.getHostelsByUserId(userId);
  }

    @Get(':id')
  getHostelById(@Param('id') id: string) {
    // Publicly accessible endpoint to get a single hostel by ID
    return this.hostelService.getHostelById(Number(id));
  }
   

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteHostel(
    @GetUser('id') userId: number,
    @Param('id') id: string,
  ) {
    return this.hostelService.deleteHostel(Number(id), userId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateHostel(
    @GetUser('id') userId: number,
    @Param('id') id: string,
    @Body() dto: CreateHostelDto,
  ) {
    return this.hostelService.updateHostel(Number(id), userId, dto);
  }

  
}
