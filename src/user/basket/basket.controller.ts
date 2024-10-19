import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BasketService } from './basket.service';
import { Auth } from 'src/auth/guards/auth.guard';
import { userGuard } from 'src/auth/guards/user.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Basket } from 'src/schemas/user/basket.schema';
import { promocodeDto } from './dto/promo.dto';

@ApiTags('Basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}
  
  @ApiOperation({summary: 'Get Basket'})
  @ApiResponse({status: 200, type: Basket})
  @ApiBearerAuth('JWT-auth')
  @Get()
  @Auth()
  getBasket(@userGuard('id') id: string) {
    return this.basketService.getBasket(id)
  }

  @ApiOperation({summary: 'Payment'})
  @ApiResponse({status: 200, type: 'Data'})
  @ApiBearerAuth('JWT-auth')
  @Post('payment')
  @Auth()
  payment(@userGuard('id') id: string, @Body() promocode: promocodeDto) {
    return this.basketService.payment(id, promocode)
  }

  @ApiOperation({summary: 'Clear Basket'})
  @ApiResponse({status: 200, type: Basket})
  @ApiBearerAuth('JWT-auth')
  @Post('clear')
  @Auth()
  clearBasket(@userGuard('id') id: string) {
    return this.basketService.clearBasket(id)
  }


  // @Post(':id')
  // @Auth()
  // rmProduct(@User('id') user: string, @Param('id') id: string) {
  //   return this.basketService.rmProduct(user, id)
  // }
}
