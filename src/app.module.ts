import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HostelService } from './hostel/hostel.service';
import { HostelController } from './hostel/hostel.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    PrismaModule,
  ],
  providers: [HostelService],
  controllers: [HostelController],
})
export class AppModule {}
