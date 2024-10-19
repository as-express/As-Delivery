import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatalogService, ShopService } from './shop.service';
import { Auth } from 'src/auth/guards/auth.guard';
import { shopDto } from './dto/shop.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { catalogDto } from './dto/catalog.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Shop } from 'src/schemas/shop/shop.schema';
import { Catalog } from 'src/schemas/shop/catalog.schema';

@ApiTags('Shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}


  @ApiOperation({summary: 'new Shop'})
  @ApiResponse({status: 200, type: Shop})
  @ApiBearerAuth('JWT-auth')
  @Post('new')
  @Auth()
  @UseInterceptors(FileInterceptor('picture'))
  @UsePipes(new ValidationPipe())
  newShop(@Body() data: shopDto, @UploadedFile() file) {
    return this.shopService.newShop(data, file)
  }

  @ApiOperation({summary: 'get Shops'})
  @ApiResponse({status: 200, type: [Shop]})
  // @ApiBearerAuth('JWT-auth')
  @Get()
  getShops(@Query('page') page: number) {
    return this.shopService.getShops(page)
  }

  @ApiOperation({summary: 'get Shop'})
  @ApiResponse({status: 200, type: Shop})
  // @ApiBearerAuth('JWT-auth')
  @Get(':id')
  getShop(@Param('id') id: string) {
    return this.shopService.getShopById(id)
  }
}

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @ApiOperation({summary: 'new Catalog'})
  @ApiResponse({status: 200, type: Catalog})
  @ApiBearerAuth('JWT-auth')
  @Post('new/:id')
  @Auth()
  @UseInterceptors(FileInterceptor('icon'))
  @UsePipes(new ValidationPipe())
  newCatalog(@Param('id') id: string, @Body() data: catalogDto, @UploadedFile() icon) {
    return this.catalogService.addCatalog(id, data, icon)
  }

  @ApiOperation({summary: 'get Catalogs'})
  @ApiResponse({status: 200, type: [Catalog]})
  // @ApiBearerAuth('JWT-auth')
  @Get()
  getCatalogs() {
    return this.catalogService.getCatalogs()
  }

  @ApiOperation({summary: 'get Catalog'})
  @ApiResponse({status: 200, type: Catalog})
  // @ApiBearerAuth('JWT-auth')
  @Get(':id')
  getCatalog(@Param('id') id: string) {
    return this.catalogService.getCatalog(id)
  }
}
