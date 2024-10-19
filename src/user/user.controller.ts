import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService, LocationServie } from './user.service';
import { Auth } from 'src/auth/guards/auth.guard';
import { userGuard } from 'src/auth/guards/user.guard';
import { passwordDto } from './dto/password.dt';
import { FileInterceptor } from '@nestjs/platform-express';
import { locationDto } from './dto/location.dto';
import { ApiResponse, ApiTags, ApiOperation, ApiBearerAuth, ApiProperty, ApiConsumes } from '@nestjs/swagger';
import { Favorite } from 'src/schemas/user/favorite.schema';
import { User } from 'src/schemas/user/user.schema';
import { fileDto } from './dto/avatar.dto';
import { Location } from 'src/schemas/user/lacation.schema';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({summary: 'Get Profile'})
  @ApiResponse({status: 200, type: User})
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  @Auth()
  getProfile(@userGuard('id') id: string) {
    return this.userService.getProfile(id)
  }

  @ApiOperation({summary: 'Get Favorite'})
  @ApiResponse({status: 200, type: Favorite})
  @ApiBearerAuth('JWT-auth')
  @Get('favorites')
  @Auth()
  getFavorite(@userGuard('id') id: string) {
    return this.userService.getFavorite(id)
  }

  @ApiOperation({summary: 'Change Password'})
  @ApiResponse({status: 200, type: 'Password is changed'})
  @ApiBearerAuth('JWT-auth')
  @Post('change-password')
  @Auth()
  @UsePipes(new ValidationPipe())
  changePassword(@userGuard('id') id: string, @Body() data: passwordDto) {
    return this.userService.changePass(id, data)
  }

  @ApiOperation({summary: 'Change Avatar'})
  @ApiConsumes("multipart/form-data")
  @ApiResponse({status: 200, type: User})
  @ApiBearerAuth('JWT-auth')
  @Post('change-avatar')
  @Auth()
  @UseInterceptors(FileInterceptor('avatar'))
  changeAvatar(@userGuard('id') id: string, @UploadedFile() ava: fileDto) {
    return this.userService.changeAvatar(id, ava)
  }
}

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationServie: LocationServie) {}

  @ApiOperation({summary: 'Add Location'})
  @ApiResponse({status: 200, type: Location})
  @ApiBearerAuth('JWT-auth')
  @Post('new')
  @Auth()
  @UsePipes(new ValidationPipe())
  addLocation(@userGuard('id') id: string, @Body() data: locationDto) {
    return this.locationServie.addLocation(id, data)
  }

  @ApiOperation({summary: 'get Locations'})
  @ApiResponse({status: 200, type: [Location]})
  @ApiBearerAuth('JWT-auth')
  @Get(':id')
  getLocations(@userGuard('id') id: string) {
    return this.getLocations(id)
  }

  @ApiOperation({summary: 'Edit Location'})
  @ApiResponse({status: 200, type: Location})
  @ApiBearerAuth('JWT-auth')
  @Put(':id')
  @UsePipes(new ValidationPipe())
  editLocation(@userGuard('id') user: string, @Param('id') id: string, data: locationDto) {
    return this.locationServie.editLocation(user, id, data)
  }

  @ApiOperation({summary: 'Delete Location'})
  @ApiResponse({status: 200, type: 'Deleted'})
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  deleteLocation(@userGuard('id') user: string, @Param('id') id: string) {
    return this.locationServie.deleteLocation(user, id)
  }
}
