import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Product } from 'src/schemas/product/product.schema';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({summary: 'Search'})
  @ApiResponse({status: 200, type: Product})
  @Get()
  findProduct(@Query('title') title: string) {
    return this.searchService.search(title)
  }
}
