import { Controller, Get, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetTopRecipes } from '../application/get.top.recipes';
import { RolesGuard } from 'backend/superchef/src/auth/guards/roles.guard';
import { AuthGuard } from 'backend/superchef/src/auth/guards/auth.guard';
import { Role } from 'backend/superchef/src/auth/domain/role.enum';
import { Roles } from 'backend/superchef/src/auth/decorators/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly stats: GetTopRecipes){}

    @HttpCode(HttpStatus.OK)
    @Roles(Role.ADMIN, Role.VIEWER)
    @Get('top-recipes')
    async getTopRecipes() {
        return this.stats.handle();
    }
}