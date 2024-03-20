import { Injectable } from '@nestjs/common';
import { Permission } from './permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>
    ){

    }

    async all():Promise<Permission[]>{
        return this.permissionRepository.find()
    }
}
