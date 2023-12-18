import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}


  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.create(createUserDto);
      console.log("create user", user);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    const query = await this.userRepository.createQueryBuilder("user")
    .leftJoinAndSelect("user.adverts", "advert")
  
    const usersList = query.getMany();

    return usersList;
  }

  async findOne(id: number) {
    const query = await this.userRepository.createQueryBuilder("user")
    .leftJoinAndSelect("user.adverts", "advert")
    .where("user.id = :id", { id });
  
    const user = query.getOne();

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.findOne(id);

    try {
      return this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: number) {
    this.findOne(id);

    try {
      return this.userRepository.softDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
