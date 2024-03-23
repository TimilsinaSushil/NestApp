import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'src/user/models/user.entitity';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService){

    }

    async userId(request: Request):Promise<number>{
        const cookie = request.cookies['jwt']
        const data = await this.jwtService.verifyAsync(cookie)
        return data['id']
    }
    
}
 