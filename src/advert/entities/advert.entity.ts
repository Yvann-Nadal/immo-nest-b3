import { CommonEntity } from "src/common/common.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('advert')
export class AdvertEntity extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        type: 'float',
        default: 0,
    })
    price: number;

    @Column()
    nb_rooms: number;

    @Column()
    square_meters: number;

    @Column()
    description: string;

    @Column()
    phoneNumber: string

    @ManyToOne(() => UserEntity, (user) => user.adverts, { nullable: true})
    user: UserEntity;
}