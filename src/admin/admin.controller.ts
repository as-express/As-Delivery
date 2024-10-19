import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { signDto } from './dto/sign.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/schemas/admin/admin.schema';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({summary: 'Register'})
  @ApiResponse({status: 200, type: Admin})
  @Post('signup')
  @UsePipes(new ValidationPipe())
  signup(@Body() data: signDto) {
    return this.adminService.signup(data)
  }

  @ApiOperation({summary: 'Login'})
  @ApiResponse({status: 200, type: Admin})
  @Post('signin')
  @UsePipes(new ValidationPipe())
  signin(@Body() data: signDto) {
    return this.adminService.signin(data)
  }
}
