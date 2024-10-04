import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductRepositoryInterface } from 'src/product/domain/port/persistance/product.repository.interface';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order.repository.interface';

export class DeleteProductService {
    constructor(
        private readonly productRepository: ProductRepositoryInterface,
        private readonly orderRepository: OrderRepositoryInterface
    ) {}

    public async execute(productId: string): Promise<void> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new NotFoundException('No product found!');
        }

        const linked = await this.orderRepository.findByProductId(productId);

        if (linked.length > 0) {
            throw new BadRequestException('The product cannot be deleted as it is currently linked to at least one command.');
        }

        this.productRepository.deleteProduct(productId);
    }
}