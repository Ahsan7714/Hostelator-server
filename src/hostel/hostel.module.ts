import { Module } from '@nestjs/common';
import { HostelController } from './hostel.controller';
import { HostelService } from './hostel.service';


@Module({
  controllers: [HostelController],
  providers: [HostelService]
})
export class UserModule {}
