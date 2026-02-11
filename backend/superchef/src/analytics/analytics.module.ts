import { Module } from '@nestjs/common';
import { AnalyticsController } from './controller/analytics.controller';
import { GetTopRecipes } from './application/get.top.recipes';
import { JwtService } from '@nestjs/jwt';

@Module({
    controllers: [AnalyticsController],
    providers: [
        JwtService,
        GetTopRecipes
    ],
})
export class AnalyticsModule {}