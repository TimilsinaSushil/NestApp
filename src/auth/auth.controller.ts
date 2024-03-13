import { BadRequestException, Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';

@Controller('')
export class AuthController {

    constructor(private userService:UserService){

    }

    @Post('register')
    async register(@Body() body: RegisterDto ){
        if(body.password !== body.password_confirm){
            throw new BadRequestException('Password do not match')
        }

        body.password = await bcrypt.hash(body.password,12);
        return this.userService.create(body);
    }

    @Post('login')
    async login(
        @Body('email') email:string,
        @Body('password') password:string
    ){
        const user = await this.userService.findOne({where:{email}});

        if(!user){
            throw new NotFoundException('User not found');
        }
        if(!await bcrypt.compare(password,user.password)){
            throw new BadRequestException('Invalid credentials');
        }

        return user;
    }
}
