import { NotFoundException } from '@nestjs/common';
import { Discount } from 'src/discount/domain/entity/discount.entity';
import { Order } from 'src/order/domain/entity/order.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';

export class PayOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  public async execute(orderId: string, discount?: Discount): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundException('Pas de commande');
    }

    order.pay(discount);

    return this.orderRepository.save(order);
  }
}
