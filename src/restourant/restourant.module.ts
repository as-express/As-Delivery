import { Module } from '@nestjs/common';
import { MenuService, RestourantService } from './restourant.service';
import { MenuController, RestourantController } from './restourant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Restourant, Reviews, restourantSchema, reviewSchema } from 'src/schemas/restourant/restaurant.schema';
import { FileModule } from 'src/file/file.module';
import { Menu, menuSchema } from 'src/schemas/restourant/menu.schema';
import { User, userSchema } from 'src/schemas/user/user.schema';

@Module({
  imports: [FileModule,
  MongooseModule.forFeature([{name: Restourant.name, schema: restourantSchema}, {name: Menu.name, schema: menuSchema},
    {name: User.name, schema: userSchema},
    {name: Reviews.name, schema: reviewSchema}
  ]),
  ],
  controllers: [RestourantController, MenuController],
  providers: [RestourantService, MenuService],
})

export class RestourantModule {}
