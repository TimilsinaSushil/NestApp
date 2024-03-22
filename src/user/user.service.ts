import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entitity';
import { AbstractService } from 'src/common/abstract.service';

@Injectable()
export class UserService extends AbstractService{
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ){
        super(userRepository)
    }
}
 