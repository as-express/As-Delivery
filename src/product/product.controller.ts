import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from 'src/auth/guards/auth.guard';
import { productDto } from './dto/procduct.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { descriptionDto } from './dto/description.dto';
import { userGuard } from 'src/auth/guards/user.guard';
import { basketDto } from './dto/basket.dto';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/schemas/product/product.schema';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({summary: 'new Product'})
  @ApiResponse({status: 200, type: Product})
  @ApiBearerAuth('JWT-auth')
  @Post('new/:id')
  @Auth()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  addProduct(@Param('id') id: string, @Body() data: productDto, @UploadedFile() file) {
    return this.productService.newProduct(id, data, file)
  }

  @ApiOperation({summary: 'add Description'})
  @ApiResponse({status: 200, type: Product})
  @ApiBearerAuth('JWT-auth')
  @Post(':id/add-desc')
  @Auth()
  @UsePipes(new ValidationPipe())
  addSecription(@Param('id') id: string,@Body() data: descriptionDto) {
    return this.productService.addDescription(id, data)
  }

  @ApiOperation({summary: 'get Products'})
  @ApiResponse({status: 200, type: [Product]})
  // @ApiBearerAuth('JWT-auth')
  @Get()
  getProducts(@Query('page') page: number) {
    return this.productService.getProducts(page)
  }

  @ApiOperation({summary: 'get Product'})
  @ApiResponse({status: 200, type: Product})
  // @ApiBearerAuth('JWT-auth')
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id)
  }

  @ApiOperation({summary: 'Add To Favorite'})
  @ApiResponse({status: 200, type: Product})
  @ApiBearerAuth('JWT-auth')
  @Post(':id/fv')
  @Auth()
  addProductToFv(@userGuard('id') id: string, @Param('id') productId: string) {
    return this.productService.addToFavorite(id, productId)
  }

  @ApiOperation({summary: 'add to Basket'})
  @ApiResponse({status: 200, type: Product})
  @ApiBearerAuth('JWT-auth')
  @Post(':id/basket')
  @UsePipes(new ValidationPipe())
  @Auth()
  addProductToBasket(@userGuard('id') id: string, @Param('id') productId: string, @Body() data: basketDto) {
    return this.productService.addToBasket(id, productId, data)
  }
}
