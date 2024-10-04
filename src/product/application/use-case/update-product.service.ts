import { NotFoundException } from "@nestjs/common";
import { UpdateProductCommand } from "src/product/domain/entity/product.entity";
import { ProductRepositoryInterface } from "src/product/domain/port/persistance/product.repository.interface";

export class UpdateProductService {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    public async execute(productId: string, newData: UpdateProductCommand) {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        product.update(newData);

        return await this.productRepository.save(product);
    }
}