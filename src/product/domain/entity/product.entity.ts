import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export interface CreateProductCommand {
    name: string;
    price: number;
    description: string;
    stock?: number;
    isActive?: boolean;
}

export interface UpdateProductCommand {
    name: string;
    price: number;
    description: string;
    stock?: number;
    isActive?: boolean;
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
        this.name = createProductCommand.name;
        this.price = createProductCommand.price;
        this.isActive = createProductCommand.isActive || false;
        this.description = createProductCommand.description;
    }

    private verifyProductIsValid(productCommand: CreateProductCommand|UpdateProductCommand): void {
        if(
            !productCommand.name
            || productCommand.name === ''
            || !productCommand.description
            || productCommand.description === ''
            || !productCommand.price
        ) {
            throw new BadRequestException('Missing required fields!');
        }
    }

    private initializeStock(productCommand: CreateProductCommand|UpdateProductCommand): void {
        this.stock = productCommand.stock || 0;
    }

    public update(updateProductCommand: UpdateProductCommand) {
        this.verifyProductIsValid(updateProductCommand);
        this.initializeStock(updateProductCommand);
        this.createdAt = new Date();
        this.name = updateProductCommand.name;
        this.price = updateProductCommand.price;
        this.isActive = updateProductCommand.isActive || false;
        this.description = updateProductCommand.description;
    }
}