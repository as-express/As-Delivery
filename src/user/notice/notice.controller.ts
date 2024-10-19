import { Controller, Get, Param, Post } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { Auth } from 'src/auth/guards/auth.guard';
import { userGuard } from 'src/auth/guards/user.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Notice } from 'src/schemas/user/notice.schema';

@ApiTags('Notice')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @ApiOperation({summary: 'Get Notice'})
  @ApiResponse({status: 200, type: Notice})
  @ApiBearerAuth('JWT-auth')
  @Get()
  @Auth()
  getNotice(@userGuard('id') id: string) {
    return this.noticeService.takeNotice(id)
  }

  @ApiOperation({summary: 'Remove Message'})
  @ApiResponse({status: 200, type: 'Removed'})
  @ApiBearerAuth('JWT-auth')
  @Post(':id')
  @Auth()
  removeMessagge(@userGuard('id') user: string, @Param('id') id: string) {
    return this.noticeService.rmMessage(user, id)
  }

  @ApiOperation({summary: 'Clear Message'})
  @ApiResponse({status: 200, type: Notice})
  @ApiBearerAuth('JWT-auth')
  @Post()
  @Auth()
  clearNotice(@userGuard('id') id: string) {
    return this.noticeService.clearAll(id)
  }
}
