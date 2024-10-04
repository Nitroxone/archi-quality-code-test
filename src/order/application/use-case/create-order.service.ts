import { EmailSenderServiceInterface } from 'src/product/domain/port/email/email-sender.service.interface';
import { CreateOrderCommand, Order } from '../../domain/entity/order.entity';
import { OrderRepositoryInterface } from '../../domain/port/persistance/order.repository.interface';

export class CreateOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly mailerService: EmailSenderServiceInterface
  ) {}

  async execute(createOrderCommand: CreateOrderCommand): Promise<Order> {
    const order = new Order(createOrderCommand);
    order.removeProductsStock(this.mailerService);

    return await this.orderRepository.save(order);
  }
}
