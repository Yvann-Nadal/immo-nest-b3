import { CommonEntity } from "src/common/common.entity";
import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('upload_file')
export class UploadFileEntity extends CommonEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
