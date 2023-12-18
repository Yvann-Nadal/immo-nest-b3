import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";


export class CommonEntity {
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date;
}