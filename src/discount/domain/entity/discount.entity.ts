import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export interface CreateDiscountCommand {
    name: string;
    code: string;
    amount: number;
}

@Entity()
export class Discount {

    @PrimaryGeneratedColumn()
    @Expose({ groups: ['group_discount'] })
    id: string;

    @Column({ nullable: false })
    @Expose({ groups: ['group_discount'] })
    name: string;

    @Column({ nullable: false })
    @Expose({ groups: ['group_discount'] })
    code: string;

    @Column()
    @Expose({ groups: ['group_discount'] })
    amount: number;

    public constructor(createDiscountCommand?: CreateDiscountCommand) {
        if (!createDiscountCommand) {
            return;
        }

        this.verifyDiscountIsValid(createDiscountCommand);
        this.initializeAmount(createDiscountCommand);
        this.name = createDiscountCommand.name;
        this.code = createDiscountCommand.code;
    }

    private verifyDiscountIsValid(createDiscountCommand: CreateDiscountCommand): void {
        if(
            !createDiscountCommand.name
            || createDiscountCommand.name === ''
            || !createDiscountCommand.code
            || createDiscountCommand.code === ''
        ) {
            throw new BadRequestException('Missing required fields!');
        }
    }

    private initializeAmount(productCommand: CreateDiscountCommand): void {
        this.amount = productCommand.amount || 1500;
    }
}