import { ProductRepositoryInterface } from "src/product/domain/port/persistance/product.repository.interface";

export class ListProductsService {
    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    public async execute(excludeInactive: boolean) {
        let products = await this.productRepository.findAll();

        if (excludeInactive) {
            products = products.filter(x => x.isActive);
        }

        return products;
    }
}