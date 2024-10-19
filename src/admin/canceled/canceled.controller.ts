import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CanceledService } from './canceled.service';
import { Auth } from 'src/auth/guards/auth.guard';
import { refuseDto } from './dto/refuse.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Canceled } from 'src/schemas/canceled.schema';

@ApiTags('Canceled For Admin')
@Controller('canceled')
export class CanceledController {
  constructor(private readonly canceledService: CanceledService) {}

  @ApiOperation({summary: 'Get All'})
  @ApiResponse({status: 200, type: [Canceled]})
  @ApiBearerAuth('JWT-auth')
  @Get()
  @Auth()
  getCancels() {
    return this.canceledService.allCanceles()
  }

  @ApiOperation({summary: 'Get Review'})
  @ApiResponse({status: 200, type: Canceled})
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  @Auth()
  review(@Param('id') no: string) {
    return this.canceledService.takeReview(no)
  }

  @ApiOperation({summary: 'Get Approve'})
  @ApiResponse({status: 200, type: 'appoved'})
  @ApiBearerAuth('JWT-auth')
  @Post(':id/approve')
  @Auth()
  approve(@Param('id') no: string) {
    return this.canceledService.getApprove(no)
  }

  @ApiOperation({summary: 'Get Refuse'})
  @ApiResponse({status: 200, type: 'refused'})
  @ApiBearerAuth('JWT-auth')
  @Post(':id/refuse')
  @Auth()
  @UsePipes(new ValidationPipe())
  refuseCance(@Param('id') no: string, @Body() data: refuseDto) {
    return this.canceledService.getRefuse(no, data)
  }

}
