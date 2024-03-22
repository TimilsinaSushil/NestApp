import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginateResult } from './paginate-result.interface';

@Injectable()
export abstract class AbstractService {
    
    protected constructor(
        protected readonly repository: Repository<any>
    ){
    }



    async all(relations:any[]=[]): Promise<any[]>{
        return this.repository.find(
            {relations}
            );
    }

    async paginate(page:number=1,relations:any[]=[]):Promise<PaginateResult>{
        const take=2;
        try{
        const[data,total]= await this.repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations
    });
        return {
            data:data,
            meta:{
                total,
                page,
                last_page:Math.ceil(total/take)
            }
        }
    }catch (error){
        console.error("Error fetching users", error)
        throw new Error("Failed to fetch users");
    }
    }

    async create(data): Promise<any>{
        return this.repository.save(data)
    } 

    async findOne(id,relations:any[]=[]):Promise<any>{
        return this.repository.findOne({
            where: {
                id:id
            },
            relations: relations
        });
    }

    async update(id:number,data):Promise<any>{
        return this.repository.update(id, data);
    }

    async delete(id:number):Promise<any>{
        return this.repository.delete(id)
    }
}
