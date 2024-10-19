import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from 'src/auth/guards/auth.guard';
import { userGuard } from 'src/auth/guards/user.guard';
import { canceDto } from './dto/cance.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Orders } from 'src/schemas/user/orders.schema';
import { Canceled } from 'src/schemas/canceled.schema';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({summary: 'Get Orders'})
  @ApiResponse({status: 200, type: [Orders]})
  @ApiBearerAuth('JWT-auth')
  @Get()
  @Auth()
  getOrders(@userGuard('id') id: string) {
    return this.orderService.getOrders(id)
  }

  @ApiOperation({summary: 'Take Order'})
  @ApiResponse({status: 200, type: Orders})
  @ApiBearerAuth('JWT-auth')
  @Post(':id/take')
  @Auth()
  takedOrder(@userGuard('id') id: string, @Param('id') no: string) {
    return this.orderService.takeOrder(id, no)
  }

  @ApiOperation({summary: 'Cance Order'})
  @ApiResponse({status: 200, type: Canceled})
  @ApiBearerAuth('JWT-auth')
  @Post(':id/cance')
  @Auth()
  @UsePipes(new ValidationPipe())
  canceOrder(@userGuard('id') id: string, @Param('id') no: string, @Body() data: canceDto) {
    return this.orderService.canceOrder(id, no, data)
  }
}
