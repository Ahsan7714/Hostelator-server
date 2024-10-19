import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
}
