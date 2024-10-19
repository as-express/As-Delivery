import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PromocodeService } from './promocode.service';
import { Auth } from 'src/auth/guards/auth.guard';
import { promoDto } from './dto/promo.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Promo } from 'src/schemas/admin/promocode.schema';

@ApiTags('Promocode For Admin')
@Controller('promocode')
export class PromocodeController {
  constructor(private readonly promocodeService: PromocodeService) {}

  @ApiOperation({summary: 'Create Promocode'})
  @ApiResponse({status: 200, type: Promo})
  @ApiBearerAuth('JWT-auth')
  @Post('new')
  @Auth()
  @UsePipes(new ValidationPipe())
  newPromo(@Body() data: promoDto) {
    return this.promocodeService.newPromo(data)
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({summary: 'Get Promocodes'})
  @ApiResponse({status: 200, type: [Promo]})
  @Get()
  @Auth()
  getPromos() {
    return this.promocodeService.getPromos()
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({summary: 'Delete Promocode'})
  @ApiResponse({status: 200, type: 'Promocode is deleted'})
  @Delete(':id')
  @Auth()
  deletePromo(@Param('id') id: string) {
    return this.promocodeService.rmPromo(id)
  }

}
