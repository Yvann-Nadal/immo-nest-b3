import { Inject, Injectable } from '@nestjs/common';
import { AdvertService } from 'src/advert/advert.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class DatabaseConfigService {
  constructor(
    @Inject(AdvertService)
    private readonly advertService: AdvertService
  ) {}
  
  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  createFixturesAdverts() {
    for (let i = 0; i < 100; i++) {
      this.advertService.create({
        title: faker.lorem.words(3), 
        price: this.randomNumber(200, 2000), 
        nb_rooms: this.randomNumber(1, 6), 
        square_meters: this.randomNumber(9, 120), 
        description: faker.lorem.paragraphs(3), 
        phoneNumber: faker.phone.number(), 
      })
    }

    return {
      message: 'Fixtures created'
    }
  }
}
