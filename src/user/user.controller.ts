import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put,Req, Query, UseGuards, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entitity';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserUpdateDto } from './models/user-update.dto';
import { PaginateResult } from 'src/common/paginate-result.interface';
import { AuthService } from 'src/auth/auth.service';
import {Request} from 'express'

@UseInterceptors(ClassSerializerInterceptor)  
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

    constructor(
        private userService: UserService,
        private authService: AuthService
        )
        {

    }

    @Get()
    // async all():Promise<User[]> {
    //     return this.userService.all();
    // }

    async all(@Query('page') page:number=1):Promise<PaginateResult>{
        return this.userService.paginate(page,['role'])
    }

    @Post()
    async create(@Body() body:UserCreateDto):Promise<User>{
        const password = await bcrypt.hash('12345',12);

        const {role_id, ...data} = body;

        return this.userService.create({
            ...data,
            password,
            role:{id:role_id}
        });
    }


    @Get(':id')
    async get(@Param('id') id:number){
        return this.userService.findOne(id,['role'])
    }

    @Put('info')
    async updateInfo(
        @Req() request:Request,
        @Body() body: UserUpdateDto
        
    ){
        const id = await this.authService.userId(request)
        await this.userService.update(id,body)
        return this.userService.findOne(id)
    }

    @Put('password') 
    async updatePassword(
        @Req() request:Request,
        @Body('password') password:string,
        @Body('password_confirm') password_confirm:string
    ){
        if(password !== password_confirm){
            throw new BadRequestException('Password do not match')
        }
        const id = await this.authService.userId(request)
        const hashed_password = await bcrypt.hash(password,12);
        await this.userService.update(id,{
            password:hashed_password
        })
        return this.userService.findOne(id)
    }

    @Put(':id')
    async update( 
        @Param('id') id:number,
        @Body() body:UserUpdateDto   
    ){
        const {role_id, ...data}=body;
        
        await this.userService.update(id,{...data,role:{id:role_id}});
        return this.userService.findOne(id)
    }

    @Delete(':id')
    async delete(@Param('id') id:number,){
        return this.userService.delete(id)
    }

}
