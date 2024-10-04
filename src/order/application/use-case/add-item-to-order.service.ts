import { BadRequestException, NotFoundException } from "@nestjs/common";
import { OrderItem } from "src/order/domain/entity/order-item.entity";
import { OrderRepositoryInterface } from "src/order/domain/port/persistance/order.repository.interface";
import { EmailSenderServiceInterface } from "src/product/domain/port/email/email-sender.service.interface";

export class AddItemToOrderService {
    constructor(
        private readonly orderRepository: OrderRepositoryInterface,
        private readonly mailerService: EmailSenderServiceInterface
    ) {}

    public async execute(orderId: string, item: OrderItem) {
        const order = await this.orderRepository.findById(orderId);

        if (!order) {
            throw new NotFoundException('Order not found.');
        }
        if (!order.isPending()) {
            throw new BadRequestException('Cannot add items to an order that is no longer in the cart');
        }

        order.addItem(item);
        order.removeProductStock(item, this.mailerService);

        return this.orderRepository.save(order);
    }
}