import { Inject, Injectable } from '@nestjs/common';
import { AdvertService } from 'src/advert/advert.service';
import { UserService } from 'src/user/user.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class DatabaseConfigService {
  constructor(
    @Inject(AdvertService)
    private readonly advertService: AdvertService,
    @Inject(UserService)
    private readonly userService: UserService
  ) {}
  
  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

async createFixturesAdverts() {
  const existingUsers = await this.userService.findAll();

  if (existingUsers.length === 0) {
    await this.createFixturesUsers();
  }

  for (let i = 0; i < 100; i++) {
    const randomUser = existingUsers[Math.floor(Math.random() * existingUsers.length)];

    this.advertService.create({
      title: faker.lorem.words(3), 
      price: this.randomNumber(200, 2000), 
      nb_rooms: this.randomNumber(1, 6), 
      square_meters: this.randomNumber(9, 120), 
      description: faker.lorem.paragraphs(3), 
      phoneNumber: faker.phone.number(),
      userId: randomUser.id
    });
  }

  return {
    message: 'Fixtures adverts created with random user relations',
  };
}

  

  createFixturesUsers() {
    for (let i = 0; i < 100; i++) {
      this.userService.create({
        name: faker.internet.userName(), 
        email: faker.internet.email(), 
        password: faker.internet.password(),
        adverts: []
      })
    }

    return {
      message: 'Fixtures users created'
    }
  }
}
