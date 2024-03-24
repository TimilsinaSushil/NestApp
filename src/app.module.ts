import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionGuard } from './permission/permission.guard';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',  //docker container database
      port: 3306,  //myql port for docker container
      username: 'root',
      password: 'root',
      database: 'admin',
      autoLoadEntities:true,  //don't use this in production environment because it will always migrates the databases
      // entities: [],
      synchronize: true,
    }),
    AuthModule,
    RoleModule,
    PermissionModule,
    ProductModule,
    OrderModule
  ],
  providers:[
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
  ]

})
export class AppModule {}
