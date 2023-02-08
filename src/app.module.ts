import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';
import { BannerModule } from './banner/banner.module';
import { MarketModule } from './market/market.module';
import { RegionModule } from './region/region.module';
import { ProductModule } from './product/product.module';
import { ProductInfoModule } from './product-info/product-info.module';
import { AuthMiddleware } from './middleware/auth.milddleaware';
import { FeedbackModule } from './feedback/feedback.module';
require("dotenv").config()

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl:false,
    // url: process.env.DATABASE_URL,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),UserModule,AuthModule,RoleModule,CategoryModule,BannerModule,MarketModule,RegionModule,ProductModule,ProductInfoModule,FeedbackModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
