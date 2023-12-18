import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { AdvertEntity } from './entities/advert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueriesAdvertDto } from './dto/queries-advert.dto';

@Injectable()
export class AdvertService {
  constructor(
    @InjectRepository(AdvertEntity)
    private advertRepository: Repository<AdvertEntity>,
  ) {}

  async create(createAdvertDto: CreateAdvertDto) {
    try {
      const advert = await this.advertRepository.create(createAdvertDto);
      return await this.advertRepository.save(advert);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(queries: QueriesAdvertDto) {
    console.log(queries);
    const { 
      min_price, 
      max_price, 
      order = 'ASC', 
      order_by = 'price',
      per_page = 2,
      page = 1,
    } = queries;

    try {
      const query = await this.advertRepository
        .createQueryBuilder('advert')

        if(min_price) {
          query.andWhere('advert.price >= :min_price', { min_price })
        }

        if(max_price) {
          query.andWhere('advert.price <= :max_price', { max_price })
        }

      query.orderBy(`advert.${order_by}`, order)

      query.take(per_page)
      query.offset((page - 1) * per_page)

      const [ data, count ] = await query.getManyAndCount()

      return {
        data,
        count,
        per_page,
        page,
        last_page: Math.ceil(count / per_page)
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllAdvertsByFilters(queries: QueriesAdvertDto): Promise<AdvertEntity[]> {
    const queryBuilder = this.advertRepository.createQueryBuilder('advert');

    // Join with the user table if user name is specified
    if (queries.query !== undefined) {
      queryBuilder.leftJoin('advert.user', 'user');
    }

    // Filter by user name
    if (queries.query !== undefined) {
      queryBuilder.andWhere('user.username LIKE :username', {
        username: `%${queries.query}%`,
      });
    }

    // Other filters...

    // Execute the query
    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    const advert = await this.advertRepository.findOneBy({id: id});

    if(!advert) throw new HttpException('Advert not found', HttpStatus.NOT_FOUND);

    return advert;
  }

  async update(id: number, updateAdvertDto: UpdateAdvertDto) {
    const advert = await this.findOne(id);

    try {
      const advert = await this.advertRepository.update(id, updateAdvertDto);
      return advert;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {  
    const advert = await this.findOne(id);

    try {
      return this.advertRepository.softRemove(advert)
    } catch (error) {
      throw new Error(error);
    }
  }
}
