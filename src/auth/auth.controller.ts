import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { JwtService } from '@nestjs/jwt';
import {Request, Response} from 'express'
import { AuthGuard } from './auth.guard';


@UseInterceptors(ClassSerializerInterceptor)  //excludes attributes specified as exclude in model
@Controller('')
export class AuthController {

    constructor(
        private userService:UserService,
        private jwtService: JwtService
        
        ){

    }

    @Post('register')
    async register(@Body() body: RegisterDto ){
        if(body.password !== body.password_confirm){
            throw new BadRequestException('Password do not match')
        }

        body.password = await bcrypt.hash(body.password,12);
        const {...data}= body;
        return this.userService.create(
            {
                ...data,
                role:{id:1}
            }
        );
    }

    @Post('login')
    async login(
        @Body('email') email:string,
        @Body('password') password:string,
        @Res({passthrough:true}) response: Response  //to send generated cookie in response
    ){
        const user = await this.userService.findOne({where:{email}});

        if(!user){
            throw new NotFoundException('User not found');
        }
        if(!await bcrypt.compare(password,user.password)){
            throw new BadRequestException('Invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id:user.id})
        response.cookie('jwt',jwt,{httpOnly:true})

        return user;
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request:Request){
        const cookie = request.cookies['jwt']
        const data = await this.jwtService.verifyAsync(cookie)
        const user = this.userService.findOne({where:{id: data.id}})
        return user;
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({passthrough:true}) response: Response){
        response.clearCookie('jwt')
        return{
            message:"success"
        }
    }
}
