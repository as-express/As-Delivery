import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { MenuService, RestourantService } from './restourant.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { restourantDto } from './dto/restourant.dto';
import { menuDto } from './dto/menu.dto';
import { Auth } from 'src/auth/guards/auth.guard';
import { userGuard } from 'src/auth/guards/user.guard';
import { reviewDto } from './dto/review.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Restourant, Reviews } from 'src/schemas/restourant/restaurant.schema';
import { Menu } from 'src/schemas/restourant/menu.schema';

@ApiTags('Restourant')
@Controller('restourant')
export class RestourantController {
  constructor(private readonly restourantService: RestourantService) {}

  @ApiOperation({summary: 'New Restourant'})
  @ApiResponse({status: 200, type: [Restourant]})
  @ApiBearerAuth('JWT-auth')
  @Post('new')
  @UseInterceptors(FileInterceptor('picture'))
  @UsePipes(new ValidationPipe())
  newRestourant(@Body() data: restourantDto, @UploadedFile() picture) {
    return this.restourantService.newRestourant(data, picture)
  }

  @ApiOperation({summary: 'Put review'})
  @ApiResponse({status: 200, type: Reviews})
  @ApiBearerAuth('JWT-auth')
  @Post()
  @Auth()
  @UsePipes(new ValidationPipe())
  putReview(@userGuard('id') id: string, @Param('id') resId: string, @Body() data: reviewDto) {
    return this.putReview(id, resId, data)
  }

  @ApiOperation({summary: 'Get Restourant'})
  @ApiResponse({status: 200, type: [Restourant]})
  // @ApiBearerAuth('JWT-auth')
  @Get()
  getRestourants(@Query('page') page: number) {
    return this.restourantService.allRestourants(page)
  }

  @ApiOperation({summary: 'Get Restourant'})
  @ApiResponse({status: 200, type: Restourant})
  // @ApiBearerAuth('JWT-auth')
  @Get(':id')
  getRestourant(@Param('id') id: string) {
    return this.restourantService.getRestourant(id)
  }
}

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({summary: 'New Menu'})
  @ApiResponse({status: 200, type: Menu})
  @ApiBearerAuth('JWT-auth')
  @Post('new/:id')
  @UsePipes(new ValidationPipe())
  newRestourant(@Body() data: menuDto, @Param('id') id: string) {
    return this.menuService.addMenu(data, id)
  }

  @ApiOperation({summary: 'Get Menues'})
  @ApiResponse({status: 200, type: [Menu]})
  // @ApiBearerAuth('JWT-auth')
  @Get()
  getRestourants() {
    return this.menuService.getAllMenu()
  }

  @ApiOperation({summary: 'get Menu'})
  @ApiResponse({status: 200, type: Menu})
  // @ApiBearerAuth('JWT-auth')
  @Get(':id')
  getRestourant(@Param('id') id: string) {
    return this.menuService.getMenu(id)
  }
}
