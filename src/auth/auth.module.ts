import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports:[
    forwardRef(()=>UserModule),   //for managing circular dependencies
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers:[AuthService],
  exports:[AuthService]
})
export class AuthModule {}
