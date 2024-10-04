import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export interface CreateProductCommand {
    name: string;
    price: number;
    description: string;
    stock?: number;
}

@Entity()
export class Product {
    @CreateDateColumn()
    @Expose({ groups: ['group_products'] })
    createdAt: Date;

    @PrimaryGeneratedColumn()
    @Expose({ groups: ['group_products'] })
    id: string;

    @Column({ nullable: false })
    @Expose({ groups: ['group_products'] })
    name: string;

    @Column({ nullable: false })
    @Expose({ groups: ['group_products'] })
    price: number;

    @Column()
    @Expose({ groups: ['group_products'] })
    isActive: boolean;

    @Column({ nullable: true })
    @Expose({ groups: ['group_products'] })
    description: string;

    @Column()
    @Expose({ groups: ['group_products'] })
    stock: number;

    public constructor(createProductCommand?: CreateProductCommand) {
        if (!createProductCommand) {
            return;
        }

        this.verifyProductIsValid(createProductCommand);
        this.initializeStock(createProductCommand);
        this.createdAt = new Date();
    }

    private verifyProductIsValid(createProductCommand: CreateProductCommand): void {
        if(
            !createProductCommand.name
            || createProductCommand.name === ''
            || !createProductCommand.description
            || createProductCommand.description === ''
            || !createProductCommand.price
        ) {
            throw new BadRequestException('Missing required fields!');
        }
    }

    private initializeStock(createProductCommand: CreateProductCommand): void {
        this.stock = createProductCommand.stock || 0;
    }
}