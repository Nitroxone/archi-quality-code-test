import { CreateProductCommand, Product } from '../../domain/entity/product.entity';
import { ProductRepositoryInterface } from 'src/product/domain/port/persistance/product.repository.interface';

export class CreateProductService {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    async execute(createProductCommand: CreateProductCommand): Promise<Product> {
        const product = new Product(createProductCommand);

        return await this.productRepository.save(product);
    }
}