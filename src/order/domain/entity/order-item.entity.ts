import { Product } from 'src/product/domain/entity/product.entity';
import { Order } from '../entity/order.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export interface ItemDetailCommand {
  product: Product;
  price: number;
  quantity: number;
}

@Entity('order-item')
export class OrderItem {
  static MAX_QUANTITY = 5;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @OneToMany(() => Product, (product) => product)
  product: Product;

  constructor(itemCommand: ItemDetailCommand) {
    if (!itemCommand) {
      return;
    }
    if (itemCommand.quantity > OrderItem.MAX_QUANTITY) {
      throw new Error(
        'Quantity of items cannot exceed ' + OrderItem.MAX_QUANTITY,
      );
    }

    this.product = itemCommand.product;
    this.quantity = itemCommand.quantity;
    this.price = itemCommand.price * this.product.price;
  }
}
